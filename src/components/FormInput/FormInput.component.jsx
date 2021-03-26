import "./FormInput.style.scss";

const FormInput = ({ handleChange, label, value, errors, ...otherProps }) => (
  <div className="group">
    <input
      className={`form-input ${errors && "error-input"}`}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label className={`${value.length ? "shrink" : ""} form-input-label `}>
        {label}
      </label>
    ) : null}
    {errors && <p className="error-feedback">{errors}</p>}
  </div>
);

export default FormInput;
