import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./styles/style.module.scss";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import Logo from "./assets/images/logoLast.svg";
import { logoutUser } from "@/store/actions";
import UserIcon from "./assets/images/user.svg";
import HomeIcon from "./assets/images/sidebar-icons/home.svg";
import AboutIcon from "./assets/images/sidebar-icons/about.svg";
import NotesIcon from "./assets/images/sidebar-icons/notes.svg";
import OffersIcon from "./assets/images/sidebar-icons/offers.svg";
import SettingsIcon from "./assets/images/sidebar-icons/settings.svg";
import LogoutIcon from "./assets/images/sidebar-icons/logout.svg";
import { FormattedMessage } from "react-intl";

import CloseIcon from "./assets/images/close.svg";
import { CircleUser, LayoutGrid, LogOut, Sheet, SquareKanban } from "lucide-react";

const Index = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const router = useRouter();
  const { pathname } = router;

  const { user } = useSelector((state) => state.authentication);

  const [showMenu, setShowMenu] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser({ cookies }));
    destroyCookie("", "token", { path: "/" });
    destroyCookie("", "userId", { path: "/" });
    router.push(`/`);
  };

  return (
    <>
      <div className={styles["header-section"]}>
        <div className="header-menu">
          <div className="logo">
            <Link href="/">
              <a>
                {/* {allCmsFooter?.logo ? (
                  <Image
                    src={handleImageLink(allCmsFooter?.logo)}
                    alt=""
                    width={300}
                    height={300}
                  />
                ) : ( */}
                <Logo />
                {/* )} */}
              </a>
            </Link>
          </div>

          <div className="left-head">
            <div className="desktop-view">
              <div className={showMenu ? "menu active" : "menu"}>
                <button
                  className="close-sidebar"
                  type="button"
                  onClick={() => setShowMenu(false)}
                >
                  <CloseIcon />
                </button>
                <ul>
                  <li>
                    <Link href="/blogs">
                      <a className={pathname === "/blogs" ? "active" : ""}>
                        <FormattedMessage id="header.blogs" />
                      </a>
                    </Link>
                  </li>

                  {cookies?.token ? (
                    <li className="drop-menu">
                      <Dropdown>
                        <Dropdown.Toggle>
                          <CircleUser color="#fff" /> {" "}
                          <FormattedMessage id="myAccount" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Link href="/account">
                            <a className="dropdown-item">
                              <LayoutGrid color="#333" size={22} />
                              <FormattedMessage id="statistics" />
                            </a>
                          </Link>

                          <Link href="/account/pv-cable">
                            <a className="dropdown-item">
                              <Sheet color="#333" size={22} />
                              <FormattedMessage id="PvCable" />
                            </a>
                          </Link>
                          <Link href="/account/mv-cable">
                            <a className="dropdown-item">
                              <SquareKanban color="#333" size={22} />
                              <FormattedMessage id="mvCable" />
                            </a>
                          </Link>
                          <Dropdown.Item onClick={handleLogout}>
                            <LogOut color="#333" size={22} />
                            <FormattedMessage id="logout" />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>{" "}
                    </li>
                  ) : (
                    <>
                      <button className="border-btn">
                        <Link href={"/login"}>
                          <a>Login</a>
                        </Link>
                      </button>
                      <button className="border-btn">
                        <Link href={"/register"}>
                          <a>Register</a>
                        </Link>
                      </button>
                    </>
                  )}
                </ul>

                <div className="user--area">
                  {cookies?.token ? (
                    <Dropdown>
                      <Dropdown.Toggle>
                        <UserIcon />
                        <FormattedMessage id="myAccount" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {user?.modules
                          ?.map((module) => module?.slug)
                          .includes("account") && (
                          <Link href="/account">
                            <a className="dropdown-item">
                              <HomeIcon fill="#111827" />
                              <FormattedMessage id="statistics" />
                            </a>
                          </Link>
                        )}
                        {user?.modules
                          ?.map((module) => module?.slug)
                          .includes("my-tenders") && (
                          <Link href="/account/my-tenders">
                            <a className="dropdown-item">
                              <AboutIcon fill="#111827" />
                              <FormattedMessage id="myTenders" />
                            </a>
                          </Link>
                        )}
                        {user?.modules
                          ?.map((module) => module?.slug)
                          .includes("bank-info") && (
                          <Link href="/account/bank-info">
                            <a className="dropdown-item">
                              <svg
                                className="icon"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  id="Color"
                                  fill={"#111827"}
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M10.166 5.5C10.166 5.224 10.39 5 10.666 5H13.666C13.942 5 14.166 5.224 14.166 5.5V7H10.166V5.5ZM9.16602 19H15.166V9H9.16602V19ZM20.166 18C20.166 18.551 19.717 19 19.166 19H17.166V9H19.166C19.717 9 20.166 9.449 20.166 10V18ZM4.16602 10V18C4.16602 18.551 4.61502 19 5.16602 19H7.16602V9H5.16602C4.61502 9 4.16602 9.449 4.16602 10ZM19.166 7H16.166V5.5C16.166 4.122 15.044 3 13.666 3H10.666C9.28802 3 8.16602 4.122 8.16602 5.5V7H5.16602C3.51202 7 2.16602 8.346 2.16602 10V18C2.16602 19.654 3.51202 21 5.16602 21H19.166C20.82 21 22.166 19.654 22.166 18V10C22.166 8.346 20.82 7 19.166 7Z"
                                />
                              </svg>
                              <FormattedMessage id="bankInfo" />
                            </a>
                          </Link>
                        )}
                        {user?.modules
                          ?.map((module) => module?.slug)
                          .includes("my-rfp") && (
                          <Link href="/account/my-rfp">
                            <a className="dropdown-item">
                              <NotesIcon fill="#111827" />
                              <FormattedMessage id="myRfp" />
                            </a>
                          </Link>
                        )}
                        {user?.modules
                          ?.map((module) => module?.slug)
                          .includes("bids") && (
                          <Link href="/account/bids">
                            <a className="dropdown-item">
                              <OffersIcon fill="#111827" />
                              <FormattedMessage id="myOffers" />
                            </a>
                          </Link>
                        )}
                        <Link href="/account/settings">
                          <a className="dropdown-item">
                            <SettingsIcon fill="#111827" />
                            <FormattedMessage id="accountSettings" />
                          </a>
                        </Link>
                        <Dropdown.Item onClick={handleLogout}>
                          <LogoutIcon fill="#111827" />
                          <FormattedMessage id="logout" />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link href="/login">
                      <a>
                        <FormattedMessage id="login" />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="actions">
              <div className="user--area">
                {cookies?.token ? (
                  <Dropdown>
                    <Dropdown.Toggle>
                      <UserIcon />
                      <FormattedMessage id="myAccount" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link href="/account/pv-cable">
                        <a className="dropdown-item">
                          <SettingsIcon fill="#111827" />
                          <FormattedMessage id="PvCable" />
                        </a>
                      </Link>
                      <Link href="/account/mv-cable">
                        <a className="dropdown-item">
                          <SettingsIcon fill="#111827" />
                          <FormattedMessage id="mvCable" />
                        </a>
                      </Link>
                      <Dropdown.Item onClick={handleLogout}>
                        <LogoutIcon fill="#111827" />
                        <FormattedMessage id="logout" />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link href="/login">
                    <a>
                      <FormattedMessage id="login" />
                    </a>
                  </Link>
                )}
              </div>

              {/* {showSearch ? (
                <button
                  type="button"
                  className="close-over"
                  onClick={() => setShowSearch(false)}
                >
                  <span></span>
                  <span></span>
                </button>
              ) : (
                <button
                  type="button"
                  className="search-btn"
                  onClick={() => {
                    setShowSearch(!showSearch);
                    setShowMenu(false);
                  }}
                >
                  <SearchIcon />
                </button>
              )} */}
              <button
                type="button"
                className={showMenu ? "open-menu active" : "open-menu"}
                onClick={() => {
                  setShowMenu(!showMenu);
                  // setShowSearch(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <div
            className={showMenu ? "overlay active" : "overlay"}
            onClick={() => setShowMenu(false)}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Index;
