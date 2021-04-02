import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeroAnimation from "../../components/HeroAnimation/HeroAnimation.component";
import "./HomePage.style.scss";

function HomePage({ user }) {
  const isLogin = user?.userId > 0;

  return (
    <div className="home-page">
      <div className="hero-container">
        <div>
          <h1 className="hero-title">Kello</h1>
          <p className="hero-body">
            Hệ thống quản lý dự án cá nhân bằng Kanban
          </p>
          <small>
            Xây dựng dựa trên{" "}
            <a
              className="original-link"
              target="_blank"
              href="https://trello.com/"
            >
              Trello
            </a>
          </small>
        </div>

        <br />
        {isLogin ? (
          <Link className="hero-redirect-btn" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link className="hero-redirect-btn" to="/login">
            Đăng nhập / Đăng ký
          </Link>
        )}
      </div>
      <HeroAnimation />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.security.user,
});

export default connect(mapStateToProps)(HomePage);
