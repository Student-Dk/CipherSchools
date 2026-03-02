// controllers/sqlController.js
import format from "pg-format";
import pool from "../config/postgres.js";
import Assignment from "../models/Assignment.js"; // 👈 Import Assignment model

export const executeQuery = async (req, res) => {
  try {
    const { query, assignmentId } = req.body;

    if (!query || !assignmentId) {
      return res.status(400).json({ error: "Query and assignmentId required" });
    }

    // ✅ Fetch assignment from MongoDB
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery.startsWith("select")) {
      return res.status(403).json({ error: "Only SELECT queries are allowed" });
    }

    // Optional: Check if query is using allowed tables only
    // For simplicity, assume assignment.tables contains allowed table names
    const tableNames = assignment.tables || [];
    if (!tableNames.some((t) => trimmedQuery.includes(t.toLowerCase()))) {
      return res.status(403).json({ error: "Query uses disallowed table" });
    }

    // Execute query
    const result = await pool.query(query);

    res.status(200).json({
      rows: result.rows,
      rowCount: result.rowCount,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getSchemaByAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ MongoDB se assignment fetch karo
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });

    // 2️⃣ PostgreSQL se sirf assignment ke tables fetch karo
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

export const testConnection = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const executeQuery = async (req, res) => {
//   try {
//     const { query } = req.body;

//     if (!query) {
//       return res.status(400).json({ error: "Query is required" });
//     }

//     const result = await pool.query(query);

//     res.status(200).json({
//       rows: result.rows,
//       rowCount: result.rowCount,
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };