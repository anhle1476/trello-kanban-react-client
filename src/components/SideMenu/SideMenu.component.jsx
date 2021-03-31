import React, { Component, useState } from "react";
import "./SideMenu.style.scss";

const SideMenuShowBtn = ({ toggleShow }) => (
  <h4 className="box white-box side-menu-show-btn" onClick={toggleShow}>
    <i className="fas fa-ellipsis-h"></i>
    <span className="box-details"> Hiện Menu</span>
  </h4>
);

const SideMenu = () => {
  const [isShow, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!isShow);
  };

  return (
    <>
      <SideMenuShowBtn toggleShow={toggleShow} />
      <div className={`side-menu ${isShow ? "show-menu" : ""}`}>
        <div className="side-menu-header">
          <div className="side-menu-group">
            <span></span>
            <h3 className="center-group">Menu</h3>
            <span className="side-menu-close-btn" onClick={toggleShow}>
              &#10005;
            </span>
          </div>
        </div>
        <div className="side-menu-body">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tenetur
            enim facilis quae aliquid ipsam corrupti nesciunt error magni
            aliquam!
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
