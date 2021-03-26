import axios from "axios";
import React, { Component } from "react";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import FormInput from "../../components/FormInput/FormInput.component";

import "./Register.style.scss";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  handleChange = ({ target }) => {
    console.log("ok");
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        errors: { confirmPassword: "Mật khẩu không trùng khớp" },
      });
      return;
    }

    const { confirmPassword, errors, ...registerForm } = this.state;
    console.log(registerForm);
    try {
      await axios.post("http://localhost:8080/register", registerForm);
      this.props.history.push("/login");
    } catch (ex) {
      this.setState({ errors: ex.response.data });
    }
  };

  render() {
    const { errors, email, fullname, password, confirmPassword } = this.state;
    return (
      <div className="register">
        <form className="register-form" onSubmit={this.handleSubmit}>
          <h3 className="text-primary">Đăng ký tài khoản</h3>
          <FormInput
            value={email}
            type="email"
            name="email"
            label="Email"
            handleChange={this.handleChange}
            errors={errors.email}
            required
          />
          <FormInput
            value={fullname}
            name="fullname"
            label="Họ và tên"
            handleChange={this.handleChange}
            errors={errors.fullname}
            required
          />
          <FormInput
            value={password}
            type="password"
            name="password"
            label="Mật khẩu"
            handleChange={this.handleChange}
            errors={errors.password}
            required
          />
          <FormInput
            value={confirmPassword}
            type="password"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            handleChange={this.handleChange}
            errors={errors.confirmPassword}
            required
          />

          <CustomButton customClass="btn-block my-2" type="submit">
            Đăng ký
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default Register;
