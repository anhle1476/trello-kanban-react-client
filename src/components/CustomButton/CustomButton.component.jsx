import "./CustomButton.style.scss";

function CustomButton({
  children,
  handleClick,
  customClass = "",
  ...btnProps
}) {
  return (
    <button
      className={`btn ${customClass}`}
      {...btnProps}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CustomButton;
