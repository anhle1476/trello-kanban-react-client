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
        <h1>SIDE MENU</h1>
        <span className="side-menu-close-btn" onClick={toggleShow}>
          &#10005;
        </span>
      </div>
    </>
  );
};

export default SideMenu;
