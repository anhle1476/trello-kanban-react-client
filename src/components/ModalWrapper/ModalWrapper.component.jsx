import "./ModalWrapper.style.scss";

const ModalWrapper = ({ children, handleToggle, width = 550 }) => (
  <div className="modal-container">
    <div className="modal-toggle-cover" onClick={handleToggle}></div>
    <div className="modal-content" style={{ width: width }}>
      {children}
    </div>
  </div>
);

export default ModalWrapper;
