import API from "../../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${API}/api/assignments`
        );
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="assignment-list">
      <h2 className="assignment-list__title">SQL Questions</h2>

      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <div className="assignment-list__grid">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="assignment-card"
              onClick={() => navigate(`/assignment/${assignment._id}`)}
            >
              <h3 className="assignment-card__title">{assignment.title}</h3>
              <span
                className={`assignment-card__difficulty assignment-card__difficulty--${assignment.difficulty}`}
              >
                {assignment.difficulty}
              </span>
              <p className="assignment-card__description">
                {assignment.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;