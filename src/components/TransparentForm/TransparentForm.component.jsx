import "./TransparentForm.style.scss";

function TransparentForm({
  value,
  handleChange,
  handleChangeComplete,
  customClass = "",
  ...otherProps
}) {
  const mapSubmitToBlur = (e) => {
    e.preventDefault();
    e.target[0].blur();
  };

  return (
    <form onSubmit={mapSubmitToBlur} className="transparent-form">
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleChangeComplete}
        className={`transparent-field ${customClass}`}
        value={value}
        {...otherProps}
      />
    </form>
  );
}

export default TransparentForm;
