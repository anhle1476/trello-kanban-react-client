import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.style.scss";

class Header extends Component {
  render() {
    const { location } = this.props;
    return (
      <div
        className={`header ${
          location.pathname.startsWith("/boards/") ? "header-trans" : ""
        }`}
      >
        <div className="left-box">
          <Link className="box" to="/">
            <i className="fas fa-home"></i>
          </Link>
          <Link className="box" to="/dashboard">
            <i className="fab fa-trello"></i>
            <span className="box-details"> Dashboard</span>
          </Link>
        </div>
        <div className="logo">
          <Link to="/">
            <i className="fab fa-trello"></i> Kello
          </Link>
        </div>
        <div className="right-box">
          <Link className="box" to="/login">
            <i className="fas fa-sign-in-alt"></i>
            <span className="box-details"> Đăng nhập</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
