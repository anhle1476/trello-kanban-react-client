import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.style.scss";

function CustomDatePicker({
  name,
  value,
  onDateChange,
  placeholder,
  ...otherProps
}) {
  return (
    <DatePicker
      dateFormat="dd-MM-yyyy"
      className="custom-date-picker"
      selected={value}
      onChange={(date) => onDateChange({ name, date })}
      isClearable
      closeOnScroll={true}
      placeholderText={placeholder}
      {...otherProps}
    />
  );
}

export default CustomDatePicker;
