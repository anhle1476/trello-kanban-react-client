import "./CustomColorPicker.style.scss";
import { SwatchesPicker } from "react-color";

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
          <SwatchesPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default CustomColorPicker;
