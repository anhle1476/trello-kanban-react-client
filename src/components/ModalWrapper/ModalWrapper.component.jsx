import "./ModalWrapper.style.scss";

const ModalWrapper = ({ children, handleToggle, width = "auto" }) => {
  const contentToggle = (e) => {
    if (e.target.classList.contains("modal-content")) {
      handleToggle(e);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-toggle-cover" onClick={handleToggle}></div>
      <div
        className="modal-content"
        style={{ width: width }}
        onClick={contentToggle}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
