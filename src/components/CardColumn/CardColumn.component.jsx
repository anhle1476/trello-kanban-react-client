import Card from "../Card/Card.component";
import HiddenAddForm from "../HiddenAddForm/HiddenAddForm.component";
import TransparentForm from "../TransparentForm/TransparentForm.component";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./CardColumn.style.scss";
import { TYPE } from "../../utils/dragAndDropUtils";

function CardColumn({
  id,
  title,
  cards,
  handleColumnTitleChange,
  handleColumnTitleSubmit,
  handleDisableColumn,
  handleAddCard,
  toggleEditCardModal,
  index,
}) {
  return (
    <Draggable draggableId={`col-${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className="column-container"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={`column drag-item ${
              snapshot.isDragging ? "dragging" : ""
            }`}
            {...provided.dragHandleProps}
          >
            <div className="column-header">
              <TransparentForm
                value={title}
                handleChange={(e) => handleColumnTitleChange(e, id)}
                handleChangeComplete={() => handleColumnTitleSubmit(id)}
                customClass="primary"
              />
              <span
                className="column-option"
                onClick={() => handleDisableColumn(id)}
              >
                <i className="fas fa-archive"></i>
              </span>
            </div>
            <Droppable droppableId={`${id}`} type={TYPE.CARDS}>
              {(provided) => (
                <div
                  className="column-body"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cards
                    .filter((card) => card.status.enabled)
                    .map((card, index) => (
                      <Card
                        toggleEditCardModal={toggleEditCardModal}
                        key={card.id}
                        card={card}
                        index={index}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="column-footer">
              <HiddenAddForm
                type="textarea"
                id={id}
                handleSubmit={handleAddCard}
                placeholder="Nhập tiêu đề thẻ..."
              >
                <p className="add-card-btn">
                  <i className="fas fa-sm fa-plus"></i> Thêm thẻ mới
                </p>
              </HiddenAddForm>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardColumn;
