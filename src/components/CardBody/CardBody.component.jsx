import { formatDate } from "../../services/dateUtils";

import "./CardBody.style.scss";

function CardBody({ label, title, startDate, dueDate, details }) {
  label = !label ? "#fff" : label;

  const detailPreview = !details
    ? ""
    : details.length > 40
    ? details.slice(0, 40) + "..."
    : details;

  return (
    <>
      <div className="card-label" style={{ backgroundColor: label }}></div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <div className="card-symbols">
          {detailPreview && (
            <span className="symbols" title={detailPreview}>
              <i className="fas fa-align-left"></i>
            </span>
          )}
          {startDate && (
            <span
              className="symbols symbols-pill start-date"
              title="Ngày bắt đầu"
            >
              <i className="fas fa-hourglass-start"></i> {formatDate(startDate)}
            </span>
          )}
          {dueDate && (
            <span
              className="symbols symbols-pill due-date"
              title="Ngày kết thúc"
            >
              <i className="fas fa-hourglass-end"></i> {formatDate(dueDate)}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default CardBody;
