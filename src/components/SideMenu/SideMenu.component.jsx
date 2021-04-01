import { useState } from "react";
import { CirclePicker } from "react-color";
import ArchivedCard from "../ArchivedCard/ArchivedCard.component";
import ArchivedColumn from "../ArchivedColumn/ArchivedColumn.component";
import CustomButton from "../CustomButton/CustomButton.component";
import SideMenuOptionWrapper from "../SideMenuOptionWrapper/SideMenuOptionWrapper.component";
import "./SideMenu.style.scss";

const SideMenuShowBtn = ({ toggleShow }) => (
  <h4 className="box white-box side-menu-show-btn" onClick={toggleShow}>
    <i className="fas fa-ellipsis-h"></i>
    <span className="box-details"> Hiện Menu</span>
  </h4>
);

const SideMenuResetSearchingBtn = ({ resetSearching }) => (
  <h4
    className="box white-box side-menu-show-btn"
    title="Hủy tìm kiếm"
    onClick={resetSearching}
  >
    <i className="fas fa-undo"></i>
    <span className="box-details"> Hủy tìm kiếm</span>
  </h4>
);

const SideMenu = ({
  color,
  cardColumns,
  searchByLabel,
  searchByTitle,
  handleColorChange,
  handleSearchByTitle,
  handleSearchByLabel,
  handleEnableColumn,
  handleEnableCard,
  handleDeleteCard,
}) => {
  const [isShow, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!isShow);
  };

  const onSearchByTitle = ({ target }) => handleSearchByTitle(target.value);

  const onSearchByLabel = (result) => handleSearchByLabel(result.hex);

  const resetSearchByLabel = () => handleSearchByLabel("");

  const resetSearching = () => {
    handleSearchByLabel("");
    handleSearchByTitle("");
  };

  const resetSearchByLabelBtnClassName = `search-by-label-reset-btn ${
    searchByLabel !== "" ? "active" : ""
  }`;

  const isResetSearchingBtnDisabled = !searchByLabel && !searchByTitle;

  const archivedColumns = cardColumns.filter((col) => !col.status.enabled);

  const archivedCards = cardColumns
    .filter((col) => col.status.enabled)
    .map((col) => col.cards)
    .flat()
    .filter((card) => !card.status.enabled);

  return (
    <>
      <div className="side-menu-toggle-btn-group">
        {!isResetSearchingBtnDisabled && (
          <SideMenuResetSearchingBtn resetSearching={resetSearching} />
        )}
        <SideMenuShowBtn toggleShow={toggleShow} />
      </div>
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
          <SideMenuOptionWrapper
            iconClass="color-preview"
            iconStyle={{ backgroundColor: color }}
            optionTitle="Đổi màu bảng"
          >
            <div className="background-color-swatch">
              <CirclePicker color={color} onChange={handleColorChange} />
            </div>
          </SideMenuOptionWrapper>
          <SideMenuOptionWrapper
            iconClass="fas fa-search"
            optionTitle="Tìm kiếm thẻ"
          >
            <input
              type="search"
              className="input-control"
              placeholder="Nhập tiêu đề..."
              value={searchByTitle}
              onChange={onSearchByTitle}
            />
            <br />
            <p className="text-center">Tìm kiếm theo tiêu đề, nhãn thẻ</p>
            <div className="search-by-label">
              <CirclePicker color={searchByLabel} onChange={onSearchByLabel} />
              <div
                className={resetSearchByLabelBtnClassName}
                onClick={resetSearchByLabel}
                title="Đặt lại tìm theo nhãn"
              >
                <i className="fas fa-tint-slash"></i>
              </div>
            </div>
            <br />
            <CustomButton
              customClass="btn-block"
              disabled={isResetSearchingBtnDisabled}
              handleClick={resetSearching}
            >
              <i className="fas fa-undo"></i> Đặt lại
            </CustomButton>
          </SideMenuOptionWrapper>
          <SideMenuOptionWrapper
            iconClass="fas fa-columns"
            optionTitle="Cột đã ẩn"
          >
            {archivedColumns.map((col) => (
              <ArchivedColumn
                handleEnableColumn={handleEnableColumn}
                key={col.id}
                {...col}
              />
            ))}
            {!archivedColumns.length && (
              <p className="text-center mt-1">Không có cột nào bị ẩn</p>
            )}
          </SideMenuOptionWrapper>
          <SideMenuOptionWrapper
            iconClass="fas fa-sticky-note"
            optionTitle="Thẻ đã ẩn"
          >
            {archivedCards.map((card) => (
              <ArchivedCard
                key={card.id}
                handleEnableCard={handleEnableCard}
                handleDeleteCard={handleDeleteCard}
                card={card}
              />
            ))}
            {!archivedCards.length && (
              <p className="text-center mt-1">Không có thẻ nào bị ẩn</p>
            )}
          </SideMenuOptionWrapper>
          <SideMenuOptionWrapper
            iconClass="fas fa-archive"
            optionTitle="Ẩn bảng"
          >
            <p>ABC</p>
          </SideMenuOptionWrapper>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
