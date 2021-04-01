import { Draggable } from "react-beautiful-dnd";
import CardBody from "../CardBody/CardBody.component";

import "./Card.style.scss";

function Card({ card, toggleEditCardModal, index }) {
  return (
    <Draggable draggableId={`card-${card.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card-container drag-item ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          onClick={() => toggleEditCardModal(card)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardBody {...card} />
        </div>
      )}
    </Draggable>
  );
}

export default Card;
