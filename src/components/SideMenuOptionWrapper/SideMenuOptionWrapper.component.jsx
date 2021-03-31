import { useState } from "react";

import "./SideMenuOptionWrapper.style.scss";

const SideMenuOptionWrapper = ({
  children,
  iconClass,
  iconStyle,
  optionTitle,
}) => {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow(!isShow);

  return (
    <div className="side-menu-options">
      <div
        className={`grid-option ${isShow ? "active" : ""}`}
        onClick={toggleShow}
      >
        <div>
          <i className={iconClass} style={iconStyle}></i>
        </div>
        <div>{optionTitle}</div>
      </div>
      <div className={`hidden-option ${isShow ? "show" : ""}`}>{children}</div>
    </div>
  );
};

export default SideMenuOptionWrapper;
