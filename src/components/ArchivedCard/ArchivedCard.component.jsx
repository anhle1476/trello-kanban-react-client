import CardBody from "../CardBody/CardBody.component";

import "./ArchivedCard.style.scss";

const ArchivedCard = ({ card, handleEnableCard }) => {
  return (
    <div className="archived-card">
      <div className="card-container">
        <CardBody {...card} />
      </div>
      <div className="archived-card-options">
        <p onClick={() => handleEnableCard(card.id)}>Khôi phục</p>
        <span> - </span>
        <p>Xóa</p>
      </div>
    </div>
  );
};

export default ArchivedCard;
