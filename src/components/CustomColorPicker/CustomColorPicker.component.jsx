import { useState } from "react";
import { SwatchesPicker } from "react-color";
import "./CustomColorPicker.style.scss";

const CustomColorPicker = ({ name, color, handleChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const colorChange = (data) => {
    handleChange({
      name,
      value: data.hex,
    });
  };

  return (
    <div>
      <div className="swatch" onClick={togglePicker}>
        <div className="color" style={{ backgroundColor: color }} />
      </div>
      {showPicker && (
        <div className="popover">
          <div className="cover" onClick={togglePicker} />
          <SwatchesPicker color={color} onChange={colorChange} />
        </div>
      )}
    </div>
  );
};

export default CustomColorPicker;
