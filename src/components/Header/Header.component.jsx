import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { destroyToken } from "../../reducers/securityReducer/securityAction";

import "./Header.style.scss";

const Header = ({ location, history, user, destroyToken }) => {
  const isLogin = user?.userId;

  const handleLogout = () => {
    destroyToken();
    history.push("/login");
  };

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
        {isLogin && (
          <Link className="box" to="/dashboard">
            <i className="fab fa-trello"></i>
            <span className="box-details"> Dashboard</span>
          </Link>
        )}
      </div>
      <div className="logo">
        <Link to="/">
          <i className="fab fa-trello"></i> Kello
        </Link>
      </div>
      <div className="right-box">
        {isLogin ? (
          <>
            <p className="header-username">{user.fullname}</p>
            <div className="box log-out" onClick={handleLogout}>
              {" "}
              Đăng xuất
            </div>
          </>
        ) : (
          <Link className="box" to="/login">
            <i className="fas fa-sign-in-alt"></i>
            <span className="box-details"> Đăng nhập</span>
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.security.user,
});

export default connect(mapStateToProps, { destroyToken })(withRouter(Header));
