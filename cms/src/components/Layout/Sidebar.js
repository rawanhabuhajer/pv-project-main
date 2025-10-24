import { sidebarData } from "data";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "assets/images/LogoNew.svg";
import { FormattedMessage } from "react-intl";
import {
  sidebarToggleFunction,
  themeSwitcherFunction,
} from "helpers/functions";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.authentication);

  // store the theme in the localStorage and invoke the theme function
  const themeSwitcher = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "dark");
    }
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    }
    themeSwitcherFunction();
  };

  const sidebarStatus = () => {
    sidebarToggleFunction();
  };

  const childMenuToggel = (e) => {
    const clickedMenuItem = e.target.closest(".side-nav-child");

    if (clickedMenuItem) {
      const subMenu = clickedMenuItem.querySelector("ul.children");
      if (subMenu) {
        clickedMenuItem.classList.toggle("active");
        subMenu.classList.toggle("active");
      }
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.querySelector("body").classList.add("dark");
      document.querySelector(".themetoggle").classList.add("fire");
    }
  }, []);



  // Render sidebar only if permissions are available
  if (!user) {
    return null; // or you can render a loading indicator
  }

  return (
    <>
      <div className="main-sidebar">
        <div className="logo">
          <div className="inner">
            <NavLink to="/">
              <img src={Logo} alt="" className="logo-icon" />
            </NavLink>
          </div>
        </div>
        <div className="side-nav">
          <ul onClick={sidebarStatus}>
            <li>
              {sidebarData?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className={
                      item?.children?.length >= 1
                        ? "active side-nav-child"
                        : "side-nav-child"
                    }
                  >
                    {item?.children?.length >= 1 ? (
                      <>
                        <div className="arrow">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.74125 5.91552L0.774312 2.94857C0.631219 2.80548 0.631219 2.57349 0.774312 2.43041L1.12036 2.08437C1.26321 1.94152 1.49472 1.94124 1.63791 2.08376L4.00033 4.43511L6.36274 2.08376C6.50593 1.94124 6.73745 1.94152 6.88029 2.08437L7.22634 2.43041C7.36943 2.5735 7.36943 2.80549 7.22634 2.94857L4.25942 5.91552C4.11633 6.0586 3.88434 6.0586 3.74125 5.91552Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <span
                          className="openChildren"
                          onClick={childMenuToggel}
                        >
                          {item?.svg}
                          <FormattedMessage id={`${item?.text}`} />
                        </span>
                      </>
                    ) : (
                      <NavLink
                        to={`${item?.to}`}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {item?.svg}
                        <span>
                          <FormattedMessage id={`${item?.text}`} />
                        </span>
                      </NavLink>
                    )}

                    {item?.children?.length >= 1 && (
                      <ul className="children">
                        {item?.children?.map((childNav) => (
                          <li key={childNav?.id}>
                            <NavLink
                              to={childNav?.to}
                              className={({ isActive }) =>
                                isActive ? "active-child" : ""
                              }
                            >
                              <span>
                                <FormattedMessage
                                  id={`${childNav?.text ?? null}`}
                                />
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
        <div className="side-actions">
          {/* <button className="themetoggle" onClick={themeSwitcher}>
            <i>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.27767 9.75128C7.09569 9.77042 8.75637 8.72284 9.52217 7.07392C9.04022 7.2842 8.51825 7.38718 7.99256 7.37575C5.93187 7.37343 4.26191 5.70347 4.25959 3.64278C4.28022 2.24888 5.04933 0.973868 6.27264 0.305337C5.94272 0.263331 5.61024 0.244523 5.27767 0.249163C2.65367 0.249163 0.526611 2.3763 0.526611 5.00022C0.526611 7.62422 2.65367 9.75128 5.27767 9.75128Z"
                  fill="#FDFDFF"
                />
              </svg>
            </i>
          </button> */}
          <div className="logout">
            <NavLink to="/logout">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 19.1367H2C0.89543 19.1367 0 18.2221 0 17.094V13.0085H2V17.094H16V2.79481H2V6.88028H0V2.79481C0 1.66664 0.89543 0.752075 2 0.752075H16C17.1046 0.752075 18 1.66664 18 2.79481V17.094C18 18.2221 17.1046 19.1367 16 19.1367ZM8 14.0299V10.9658H0V8.92302H8V5.85891L13 9.94438L8 14.0299Z"
                  fill="#A3AED0"
                />
              </svg>

              <span>تسجيل خروج</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
