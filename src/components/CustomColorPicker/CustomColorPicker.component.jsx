import "./CustomColorPicker.style.scss";
import { CirclePicker } from "react-color";

const CustomColorPicker = ({
  displayColorPicker,
  color,
  handleClick,
  handleChange,
  handleClose,
}) => {
  return (
    <div>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{ backgroundColor: color }} />
      </div>
      {displayColorPicker && (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <CirclePicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default CustomColorPicker;
