import "./ModalWrapper.style.scss";

const ModalWrapper = ({ children, handleToggle, width = "auto" }) => (
  <div className="modal-container">
    <div className="modal-toggle-cover" onClick={handleToggle}></div>
    <div className="modal-content" style={{ width: width }}>
      {children}
    </div>
  </div>
);

export default ModalWrapper;
