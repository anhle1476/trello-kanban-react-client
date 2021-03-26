import { withRouter } from "react-router";
import "./BoardPreview.style.scss";

function BoardPreview({
  id,
  title,
  color = "#fff",
  status,
  onClick,
  addBoard = false,
}) {
  return (
    <div
      className={`board-preview ${addBoard ? "modal-toggle" : ""}`}
      style={{ backgroundColor: color }}
      onClick={(e) => onClick(e, id)}
    >
      <div className={`board-info ${addBoard && "add-board"}`}>
        {addBoard ? (
          <div className="add-link">Tạo bảng mới</div>
        ) : (
          <>
            <h4>{title}</h4>
            <div className="board-status">
              {status.updatedAt ? (
                <p>
                  <i className="fas fa-pen-alt"></i> {status.updatedAt}
                </p>
              ) : (
                <p>
                  <i className="fas fa-puzzle-piece"></i> {status.createdAt}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(BoardPreview);
