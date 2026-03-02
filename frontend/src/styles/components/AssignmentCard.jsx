import "./_assignment-card.scss";

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="assignment-card">
      <div className="assignment-card__header">
        <h3 className="assignment-card__title">
          {assignment.title}
        </h3>
        <span className={`assignment-card__difficulty assignment-card__difficulty--${assignment.difficulty.toLowerCase()}`}>
          {assignment.difficulty}
        </span>
      </div>

      <p className="assignment-card__description">
        {assignment.description}
      </p>

      <button className="assignment-card__button">
        Attempt
      </button>
    </div>
  );
};

export default AssignmentCard;