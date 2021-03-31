import { useState } from "react";

import "./SideBarOptionWrapper.style.scss";

const SideBarOptionWrapper = ({
  children,
  iconClass,
  iconStyle,
  optionTitle,
}) => {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow(!isShow);

  return (
    <div className="side-menu-options">
      <div className="grid-option" onClick={toggleShow}>
        <div>
          <i className={iconClass} style={iconStyle}></i>
        </div>
        <div>{optionTitle}</div>
      </div>
      <div className={`hidden-option ${isShow ? "show" : ""}`}>{children}</div>
    </div>
  );
};

export default SideBarOptionWrapper;
