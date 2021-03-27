import "./AddBoardModal.style.scss";

import React, { Component } from "react";
import CustomButton from "../CustomButton/CustomButton.component";
import { CirclePicker } from "react-color";

class AddBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      color: "#f00",
    };
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex });
  };

  handleTitleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddBoard(this.state);
  };

  render() {
    const { title, color } = this.state;
    const { toggleModal } = this.props;
    const titleSize = title.trim().length;
    return (
      <div className="add-board-modal modal-toggle" onClick={toggleModal}>
        <div className="modal-container">
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <div className="modal-input-group">
              <div>
                <div className="title-input" style={{ backgroundColor: color }}>
                  <input
                    className="transparent-input"
                    placeholder="Thêm tiêu đề"
                    name="title"
                    onChange={this.handleTitleChange}
                    value={title}
                  ></input>
                  <span
                    onClick={toggleModal}
                    className="modal-close-btn modal-toggle"
                  >
                    &#10005;
                  </span>
                </div>
                <CustomButton
                  disabled={titleSize < 4 || titleSize > 25}
                  customClass="add-btn"
                  type="submit"
                >
                  Tạo bảng
                </CustomButton>
              </div>
              <CirclePicker color={color} onChange={this.handleColorChange} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBoardModal;
