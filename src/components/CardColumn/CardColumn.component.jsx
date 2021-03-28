import Card from "../Card/Card.component";
import HiddenAddForm from "../HiddenAddForm/HiddenAddForm.component";
import TransparentForm from "../TransparentForm/TransparentForm.component";
import "./CardColumn.style.scss";

function CardColumn({
  id,
  title,
  cards,
  handleColumnTitleChange,
  handleColumnTitleSubmit,
  handleAddCard,
}) {
  return (
    <div className="column-container">
      <div className="column">
        <div className="column-header">
          <TransparentForm
            value={title}
            handleChange={(e) => handleColumnTitleChange(e, id)}
            handleChangeComplete={() => handleColumnTitleSubmit(id)}
            customClass="primary"
          />
          <span className="column-option">
            <i className="fas fa-archive"></i>
          </span>
        </div>
        <div className="column-body">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
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
  );
}

export default CardColumn;
