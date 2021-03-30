import { Draggable } from "react-beautiful-dnd";
import { formatDate } from "../../utils/dateUtils";

import "./Card.style.scss";

function Card({ card, toggleEditCardModal, index }) {
  let { id, title, label, details, startDate, dueDate } = card;
  label = !label ? "#fff" : label;
  details = !details ? "" : details;
  return (
    <Draggable draggableId={`card-${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card-container drag-item ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          title={details}
          onClick={() => toggleEditCardModal(card)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
                  <i className="fas fa-hourglass-start"></i>{" "}
                  {formatDate(startDate)}
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
        </div>
      )}
    </Draggable>
  );
}

export default Card;
