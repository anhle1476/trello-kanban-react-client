import "./Card.style.scss";

function Card({ title, label, details, startDate, dueDate }) {
  label = !label ? "#fff" : label;
  details = !details ? "" : details;
  return (
    <div className="card-container">
      <div className="card-label" style={{ backgroundColor: label }}>
        {" "}
      </div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <div className="card-symbols">
          {details && (
            <span className="symbols">
              <i className="fas fa-align-left"></i>
            </span>
          )}
          {startDate && (
            <span
              className="symbols symbols-pill start-date"
              title="Ngày bắt đầu"
            >
              <i className="fas fa-hourglass-start"></i> {startDate.slice(0, 5)}
            </span>
          )}
          {dueDate && (
            <span
              className="symbols symbols-pill due-date"
              title="Ngày kết thúc"
            >
              <i className="fas fa-hourglass-end"></i> {dueDate.slice(0, 5)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
