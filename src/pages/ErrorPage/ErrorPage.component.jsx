import { Link } from "react-router-dom";

import "./ErrorPage.style.scss";

function ErrorPage() {
  return (
    <div className="container">
      <div className="error-container">
        <div>
          <h1>Trang bạn yêu cầu không tồn tại</h1>
          <Link to="/">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
