import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const { isLoggedIn } = useSelector((state) => state.authentication);

  return (
    <div className="main-wrapper">
      {isLoggedIn ? (
        <>
          <Header />
          <Sidebar />
          <div
            className={isLoggedIn ? "content-wrap" : "content-wrap full-width"}
            id="content-wrapper"
          >
            {props.children}
            <Outlet />
          </div>
        </>
      ) : (
        <div className="content-wrap full-width">
          <div className="card login">
            <h3>يرجى تسجيل الدخول للوصول إلى الصفحة المطلوبة</h3>
            <NavLink to="/login" className="btn">
              تسجيل الدخول
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
