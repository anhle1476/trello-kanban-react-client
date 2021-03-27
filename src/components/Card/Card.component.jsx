import "./Card.style.scss";

function Card({ title }) {
  return (
    <div className="card-container">
      <p>{title}</p>
    </div>
  );
}

export default Card;
