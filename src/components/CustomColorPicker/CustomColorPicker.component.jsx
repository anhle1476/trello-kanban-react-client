import { useState } from "react";
import { GithubPicker } from "react-color";
import { SWATCH } from "./defaultSwatch";
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
          <GithubPicker
            colors={SWATCH}
            color={color}
            width="163px"
            onChange={colorChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomColorPicker;
