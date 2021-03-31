import { useState } from "react";
import SideBarOptionWrapper from "../SideBarOptionWrapper/SideBarOptionWrapper.component";
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
          <SideBarOptionWrapper
            iconClass="color-preview"
            iconStyle={{ backgroundColor: "#f00" }}
            optionTitle="Đổi màu bảng"
          >
            <p>ABC</p>
          </SideBarOptionWrapper>
          <SideBarOptionWrapper
            iconClass="fas fa-search"
            optionTitle="Tìm kiếm thẻ"
          >
            <p>ABC</p>
          </SideBarOptionWrapper>
          <SideBarOptionWrapper
            iconClass="fas fa-columns"
            optionTitle="Cột đã ẩn"
          >
            <p>ABC</p>
          </SideBarOptionWrapper>
          <SideBarOptionWrapper
            iconClass="fas fa-sticky-note"
            optionTitle="Thẻ đã ẩn"
          >
            <p>ABC</p>
          </SideBarOptionWrapper>
          <SideBarOptionWrapper
            iconClass="fas fa-archive"
            optionTitle="Ẩn bảng"
          >
            <p>ABC</p>
          </SideBarOptionWrapper>
        </div>
      </div>
    </>
  );
};

export default SideMenu;