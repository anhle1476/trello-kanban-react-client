import { Link } from "react-router-dom";
import "./Header.style.scss";

const Header = () => (
  <div className="header">
    <div className="left-box">
      <Link className="btn" to="/">
        <i className="fas fa-home"></i>
      </Link>
      <Link className="btn" to="/dashboard">
        <i className="fab fa-trello"></i> Dashboard
      </Link>
    </div>
    <div className="logo">
      <Link to="/">
        <i className="fab fa-trello"></i> Kello
      </Link>
    </div>
    <div className="right-box">
      <Link className="btn" to="/login">
        <i className="fas fa-sign-in-alt"></i> Đăng nhập
      </Link>
    </div>
  </div>
);

export default Header;
