import "./ArchivedColumn.style.scss";

const ArchivedColumn = ({ id, title, handleEnableColumn }) => {
  return (
    <div className="archived-column">
      <p className="archived-column-title">{title}</p>
      <div
        className="unarchive-column-btn"
        onClick={() => handleEnableColumn(id)}
      >
        <i className="fas fa-undo"></i>
        <span> Khôi phục</span>
      </div>
    </div>
  );
};

export default ArchivedColumn;
