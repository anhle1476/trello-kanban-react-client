import React, { Component } from "react";
import CustomButton from "../CustomButton/CustomButton.component";

import "./HiddenAddForm.style.scss";

class HiddenAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      title: "",
    };
  }

  toggleShow = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  handleChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { id, handleSubmit } = this.props;
    handleSubmit(this.state.title.trim(), id);
    this.setState({ isShow: false, title: "" });
  };

  render() {
    const { children, placeholder, type } = this.props;
    const { isShow, title } = this.state;
    return (
      <div className="hidden-add-form">
        {isShow ? (
          <div className="hidden-part">
            <form onSubmit={this.handleSubmitForm}>
              {type === "textarea" ? (
                <textarea
                  className="hidden-part-input"
                  placeholder={placeholder}
                  value={title}
                  onChange={this.handleChange}
                ></textarea>
              ) : (
                <input
                  type="text"
                  className="hidden-part-input"
                  placeholder={placeholder}
                  value={title}
                  onChange={this.handleChange}
                />
              )}

              <div className="hidden-part-btn-group">
                <CustomButton
                  type="submit"
                  disabled={title.trim().length === 0}
                  customClass="add-btn"
                >
                  Lưu
                </CustomButton>
                <span
                  className="hidden-part-toggle-btn"
                  onClick={this.toggleShow}
                >
                  &#10005;
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="show-part" onClick={this.toggleShow}>
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default HiddenAddForm;
