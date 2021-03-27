import { Link } from "react-router-dom";

import "./ErrorPage.style.scss";

function ErrorPage() {
  return (
    <div>
      <h1>Error</h1>
      <Link to="/">Trở về trang chủ</Link>
    </div>
  );
}

export default ErrorPage;
