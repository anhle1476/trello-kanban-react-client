import DatePicker from "react-datepicker";
import { getDateStr } from "../../services/dateUtils";

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
      className="custom-date-picker input-control"
      selected={value}
      onChange={(date) => onDateChange({ name, value: getDateStr(date) })}
      isClearable
      closeOnScroll={true}
      placeholderText={placeholder}
      {...otherProps}
    />
  );
}

export default CustomDatePicker;
