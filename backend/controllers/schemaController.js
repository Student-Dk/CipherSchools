import pool from "../config/postgres.js";
import Assignment from "../models/Assignment.js";
import format from "pg-format"; 

export const getSchema = async (req, res) => {
  try {
    const { assignmentId } = req.params; 
    if (!assignmentId) {
      return res.status(400).json({ error: "assignmentId is required" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if (!assignment.tables || assignment.tables.length === 0) {
      return res.status(400).json({ error: "No tables defined for this assignment" });
    }

    const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY($1)
    `;
    const tablesResult = await pool.query(tablesQuery, [assignment.tables]);

   
    const tables = await Promise.all(
      tablesResult.rows.map(async (table) => {
        const columnsQuery = `
          SELECT column_name, data_type
          FROM information_schema.columns
          WHERE table_name = $1
        `;
        const columnsResult = await pool.query(columnsQuery, [table.table_name]);

        const sampleQuery = format("SELECT * FROM %I LIMIT 5", table.table_name);
        const sampleData = await pool.query(sampleQuery);

        return {
          tableName: table.table_name,
          columns: columnsResult.rows,
          sampleRows: sampleData.rows,
        };
      })
    );

    res.status(200).json(tables);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};