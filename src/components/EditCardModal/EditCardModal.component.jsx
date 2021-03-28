import React, { Component } from "react";
import CustomColorPicker from "../CustomColorPicker/CustomColorPicker.component";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker.component";

import ModalWrapper from "../ModalWrapper/ModalWrapper.component";
import TransparentForm from "../TransparentForm/TransparentForm.component";
import { getDate } from "../../utils/dateUtils";

import "./EditCardModal.style.scss";

class EditCardModal extends Component {
  handleToggle = () => {
    this.props.toggleModal();
  };

  render() {
    const {
      editingCard: { id, title, label, details, dueDate, startDate },
    } = this.props;
    return (
      <ModalWrapper handleToggle={this.handleToggle} width={900}>
        <div className="edit-card-modal">
          <div className="edit-card-modal-header">
            <TransparentForm value={title} />
            <span onClick={this.handleToggle}>&#10005;</span>
          </div>
          <div className="edit-card-description">
            <h3>Chi tiết</h3>
            <p>{details}</p>
          </div>
          <div className="edit-card-label">
            <h3>Nhãn</h3>
            <div>
              <CustomColorPicker color={label} />
            </div>
          </div>
          <div className="edit-card-dates">
            <div className="edit-card-start-date">
              <span>Ngày bắt đầu:</span>
              <CustomDatePicker
                name="startDate"
                value={getDate(startDate)}
                onDateChange={console.log}
                placeholder="Nhập ngày bắt đầu..."
              />
            </div>
            <div className="edit-card-start-date">
              <span>Ngày kết thúc:</span>
              <CustomDatePicker
                name="dueDate"
                value={getDate(dueDate)}
                onDateChange={console.log}
                placeholder="Nhập ngày kết thúc..."
              />
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

export default EditCardModal;
