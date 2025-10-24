import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import userimg from "../../assets/images/user.png";
import logo from "../../assets/images/new-logo.svg";
// import { logoutUser } from "store/actions";
import { useSelector } from "react-redux";

const Header = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  const sidebarToggle = () => {
    document.querySelector("body").classList.toggle("sidebarToggled");
    document.querySelector(".overlay-s").classList.toggle("fire");
    document.querySelector("html").classList.toggle("offScroll");
  };

  return (
    <>
      <div className="main-head">
        <div className="logo">
          <div className="inner">
            <NavLink to="/">
              <div className="logo-icon">
                <img src={logo} alt="" />
              </div>
              {/* <div className="logo-info">
                <img src={logoInfo} alt="" />
              </div> */}
            </NavLink>
          </div>
        </div>
        <div className="head-wrp">
          <div className="burgerBtn">
            <button className="toggleSidebar" onClick={sidebarToggle}>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 1C15.75 0.585786 15.4142 0.25 15 0.25H6C5.58579 0.25 5.25 0.585786 5.25 1C5.25 1.41421 5.58579 1.75 6 1.75H15C15.4142 1.75 15.75 1.41421 15.75 1Z"
                  fill="#0daca3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 13C15.75 12.5858 15.4142 12.25 15 12.25H9C8.58579 12.25 8.25 12.5858 8.25 13C8.25 13.4142 8.58579 13.75 9 13.75H15C15.4142 13.75 15.75 13.4142 15.75 13Z"
                  fill="#0daca3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 7C15.75 6.58579 15.4142 6.25 15 6.25H1C0.585787 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585787 7.75 1 7.75H15C15.4142 7.75 15.75 7.41421 15.75 7Z"
                  fill="#0daca3"
                />
              </svg>
            </button>
          </div>

          <div className="authWrap">
            <ul>
              <li className="menu-item-has-children">
                <Dropdown>
                  <Dropdown.Toggle>
                    <div className="au-flow">
                      <div className="au-img">
                        <img src={userimg} alt="" />
                      </div>
                      <div className="au-data">
                        <h4>{user?.fullName}</h4>
                      </div>
                    </div>
                    {/* <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.14376 6.13396L1.06422 2.05441C0.867468 1.85766 0.867468 1.53867 1.06422 1.34194L1.54003 0.866126C1.73645 0.66971 2.05478 0.669332 2.25166 0.865287L5.5 4.09841L8.74832 0.865287C8.9452 0.669332 9.26353 0.66971 9.45995 0.866126L9.93576 1.34194C10.1325 1.53869 10.1325 1.85768 9.93576 2.05441L5.85625 6.13396C5.65949 6.3307 5.34051 6.3307 5.14376 6.13396Z"
                        fill="black"
                      />
                    </svg> */}
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu>
                    <NavLink to="/logout" className="dropdown-item">
                      خروج
                    </NavLink>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => dispatch(logoutUser())}
                    >
                      تسجيل خروج
                    </button>
                  </Dropdown.Menu> */}
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="overlay-s" onClick={sidebarToggle}></div>
    </>
  );
};

export default Header;
