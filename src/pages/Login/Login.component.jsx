import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import FormInput from "../../components/FormInput/FormInput.component";
import { loginSuccess } from "../../reducers/securityReducer/securityAction";
import PropTypes from "prop-types";

import "./Login.style.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  }

  handleChange = ({ target }) => {
    console.log("ok");
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, ...loginForm } = this.state;
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginForm
      );
      this.props.loginSuccess(response.data.token);
      this.props.history.push("/dashboard");
    } catch (ex) {
      this.setState({ errors: "Email / Mật khẩu không hợp lệ " });
    }
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="sign-in">
        <form className="sign-in-form" onSubmit={this.handleSubmit}>
          <h3 className="text-primary">Đăng nhập</h3>
          <FormInput
            value={email}
            type="email"
            name="email"
            label="Email"
            handleChange={this.handleChange}
            required
          />
          <FormInput
            value={password}
            type="password"
            name="password"
            label="Mật khẩu"
            handleChange={this.handleChange}
            required
          />
          {errors && <p className="error-feedback">{errors}</p>}

          <CustomButton customClass="btn-block my-2" type="submit">
            Đăng nhập
          </CustomButton>

          <p className="my-2 text-center">
            Chưa có tải khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default connect(null, { loginSuccess })(Login);
