import CustomColorPicker from "../CustomColorPicker/CustomColorPicker.component";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker.component";

import ModalWrapper from "../ModalWrapper/ModalWrapper.component";
import TransparentForm from "../TransparentForm/TransparentForm.component";
import { getDate } from "../../services/dateUtils";

import "./EditCardModal.style.scss";
import CustomButton from "../CustomButton/CustomButton.component";

const EditCardModal = ({
  editingCard: { title, label, details, dueDate, startDate },
  toggleModal,
  handleChange,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <ModalWrapper handleToggle={() => toggleModal()}>
      <div className="edit-card-modal">
        <div className="edit-card-modal-group mb-1">
          <div className="edit-card-modal-icons icon-center">
            <i className="fas fa-sticky-note"></i>
          </div>
          <div className="edit-card-modal-header">
            <TransparentForm
              name="title"
              handleChange={({ target }) => handleChange(target)}
              customClass="primary input-lg"
              value={title}
            />
            <span
              className="edit-card-modal-toggle-btn"
              onClick={() => toggleModal()}
            >
              &#10005;
            </span>
          </div>
        </div>
        <div className="edit-card-modal-group custom-size">
          <div className="edit-card-modal-icons">
            <i className="fas fa-align-left"></i>
          </div>
          <div className="edit-card-description">
            <h3>Chi tiết</h3>
            <textarea
              name="details"
              className="input-control"
              value={details}
              onChange={({ target }) => handleChange(target)}
            ></textarea>
          </div>
        </div>

        <div className="edit-card-modal-optional-group">
          <div className="optional-input-group">
            <div className="edit-card-modal-group custom-size">
              <div className="edit-card-modal-icons">
                <i className="fas fa-palette"></i>
              </div>
              <div className="edit-card-label">
                <h3>Nhãn</h3>
                <div>
                  <CustomColorPicker
                    name="label"
                    handleChange={handleChange}
                    color={label}
                  />
                </div>
              </div>
            </div>

            <div className="edit-card-modal-group custom-size">
              <div className="edit-card-modal-icons">
                <i className="far fa-calendar-alt"></i>
              </div>
              <div className="edit-card-dates">
                <div className="edit-card-start-date">
                  <h3>Ngày bắt đầu:</h3>
                  <CustomDatePicker
                    name="startDate"
                    value={getDate(startDate)}
                    onDateChange={handleChange}
                    placeholder="Nhập ngày bắt đầu..."
                  />
                </div>
                <div className="edit-card-start-date">
                  <h3>Ngày kết thúc:</h3>
                  <CustomDatePicker
                    name="dueDate"
                    value={getDate(dueDate)}
                    onDateChange={handleChange}
                    placeholder="Nhập ngày kết thúc..."
                  />
                </div>
              </div>
            </div>

            <div className="edit-card-modal-group custom-size">
              <div></div>
              <div className="optional-btn-group">
                <CustomButton
                  customClass="btn-success mr-1"
                  handleClick={handleSubmit}
                >
                  Lưu thay đổi
                </CustomButton>

                <CustomButton
                  customClass="btn-secondary"
                  handleClick={() => toggleModal()}
                >
                  Hủy
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="optional-btn-group">
            <CustomButton
              customClass="btn-danger"
              title="Xóa thẻ"
              handleClick={handleDelete}
            >
              <i className="fas fa-archive"></i>
              <span className="optional-btn-detail"> Ẩn thẻ</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditCardModal;
