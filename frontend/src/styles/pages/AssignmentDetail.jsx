import API from "../../config/api";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const AssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sqlQuery, setSqlQuery] = useState("");
  const [results, setResults] = useState([]);
  const [queryError, setQueryError] = useState(null);
  const [schema, setSchema] = useState([]);
  const [hint, setHint] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${API}/api/assignments/${id}`
        );
        setAssignment(response.data);
        setSqlQuery(`SELECT * FROM `);
      } catch (err) {
        setError("Failed to fetch assignment");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axios.get(
          `${API}/api/sql/schema/${id}`
        );
        setSchema(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchema();
  }, [id]);

  const executeQuery = async () => {
    try {
      setQueryError(null);
      setHint("");

      const response = await axios.post(
        `${API}/api/sql/execute`,
        {
          query: sqlQuery,
          assignmentId: id,
        }
      );

      setResults(response.data.rows);
    } catch (err) {
      setQueryError(err.response?.data?.error || "Execution failed");
      setResults([]);
    }
  };

  const executeHint = async () => {
    try {
      setQueryError(null);

      const response = await axios.post(
        `${API}/api/gemini/hint`,
        {
          assignmentId: id,
        }
      );

      setHint(response.data.hint); 
    } catch (err) {
      setQueryError(err.response?.data?.error || "Hint failed");
    }
  };

  if (loading) return <p>Loading assignment...</p>;
  if (error) return <p>{error}</p>;
  if (!assignment) return <p>No assignment found</p>;

  return (
    <div className="assignment-detail">
      <h2 className="assignment-detail__title">{assignment.title}</h2>

      <div className="assignment-detail__container">
        {/* LEFT SIDE */}
        <div className="assignment-detail__left">
          <p><strong>Difficulty:</strong> {assignment.difficulty}</p>
          <p>{assignment.description}</p>

          <h3>Database Tables</h3>
          {schema.map((table) => (
            <div key={table.tableName} style={{ marginBottom: "20px" }}>
              <h4>{table.tableName}</h4>

              <p><strong>Columns:</strong></p>
              <ul>
                {table.columns.map((col, index) => (
                  <li key={index}>
                    {col.column_name} ({col.data_type})
                  </li>
                ))}
              </ul>

              <p><strong>Sample Data:</strong></p>
              {table.sampleRows.length > 0 ? (
                <table border="1" cellPadding="4">
                  <thead>
                    <tr>
                      {Object.keys(table.sampleRows[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.sampleRows.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, i) => (
                          <td key={i}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No sample data available</p>
              )}
            </div>
          ))}

          <h3>Write Your SQL Query</h3>
          <div style={{ marginTop: "10px" }}>
            <Editor
              height="200px"
              defaultLanguage="sql"
              theme="vs-dark"
              value={sqlQuery}
              onChange={(value) => setSqlQuery(value)}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
            />
          </div>

          <button
            onClick={executeQuery}
            className="assignment-detail__button"
          >
            Execute Query
          </button>

          <button
            onClick={executeHint}
            className="assignment-detail__button"
          >
            Hint
          </button>

          {queryError && (
            <p className="assignment-detail__error">{queryError}</p>
          )}

        
          {hint && (
            <p className="assignment-detail__hint">
              <strong>Hint:</strong> {hint}
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="assignment-detail__right">
          <h3>Results</h3>
          {results.length > 0 ? (
            <table className="assignment-detail__table">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;