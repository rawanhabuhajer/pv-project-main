import React, { useEffect, useState, useRef } from "react";

import Logo from "./assets/images/newImages/logo2.svg";
import HomeIcon from "./assets/images/sidebar-icons/home.svg";
import AboutIcon from "./assets/images/sidebar-icons/about.svg";
import NotesIcon from "./assets/images/sidebar-icons/notes.svg";
import OffersIcon from "./assets/images/sidebar-icons/offers.svg";
import ReportIcon from "./assets/images/sidebar-icons/report.svg";
import DropDownIcon from "./assets/images/sidebar-icons/downArrow.svg";
import CircleIcon from "./assets/images/sidebar-icons/circle.svg";
import KnowledgeIcon from "./assets/images/sidebar-icons/knowledge.svg";
import SettingsIcon from "./assets/images/sidebar-icons/settings.svg";
import LogoutIcon from "./assets/images/sidebar-icons/logout.svg";
import HelpIcon from "./assets/images/settings/Info.svg";
import BlogsIcon from "./assets/images/blogs.svg";
import SuggestionsIcon from "./assets/images/suggestions.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { destroyCookie, parseCookies } from "nookies";
import { logoutUser } from "@/store/actions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Image from "next/future/image";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";
import { FormattedMessage, useIntl } from "react-intl";
const Sidebar = ({
  sidebarToggled,
  setSidebarToggled,
  setCompanyPopup,
  companyPopup,
  setSuggestions,
  suggestions,
  startConversation,
  isWideScreen,
}) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const router = useRouter();
  const { locale } = router;
  const { account } = router.query;
  const { formatMessage } = useIntl();

  const { user } = useSelector((state) => state?.authentication);
  const navRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleReport, setDropdownVisibleReport] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser({ cookies }));
    destroyCookie("", "token", { path: "/" });
    destroyCookie("", "userId", { path: "/" });
    router.push(`/`);
  };

  useEffect(() => {
    setDropdownVisible(false);
    setDropdownVisibleReport(false);
  }, [router]);
  return (
    <>
      {
        <div
          className={
            sidebarToggled ? "account--sidebar active" : "account--sidebar"
          }
        >
          <div className="sidebar--logo">
            <div
              onClick={() => {
                setCompanyPopup(!companyPopup);
                setSuggestions(false);
              }}
            >
              <Logo fill="#fff" width={120} />
            </div>
          </div>
          <div className="sidebar--menu">
            <ul>
              <div>
                {(isWideScreen && account.length === 1) ||
                (isWideScreen &&
                  account[1] === "automation" &&
                  account.length === 2) ? (
                  <OverlayTrigger
                    placement={locale === "ar" ? "left" : "right"}
                    overlay={
                      <Tooltip>
                        <FormattedMessage id="accountSettings" />
                      </Tooltip>
                    }
                  >
                    <li onClick={() => setSidebarToggled(false)}>
                      <Link href="/account/settings">
                        <a
                          className={account[1] === "settings" ? "active" : ""}
                        >
                          <SettingsIcon
                            fill={
                              account[1] === "settings" ? "#095183" : "#fff"
                            }
                          />
                        </a>
                      </Link>
                    </li>
                  </OverlayTrigger>
                ) : (
                  <li onClick={() => setSidebarToggled(false)}>
                    <Link href="/account/settings">
                      <a className={account[1] === "settings" ? "active" : ""}>
                        <SettingsIcon
                          fill={account[1] === "settings" ? "#095183" : "#fff"}
                        />
                        <span>
                          <FormattedMessage id="accountSettings" />
                        </span>
                      </a>
                    </Link>
                  </li>
                )}
                {(isWideScreen && account.length === 1) ||
                (isWideScreen &&
                  account[1] === "automation" &&
                  account.length === 2) ? (
                  <OverlayTrigger
                    placement={locale === "ar" ? "left" : "right"}
                    overlay={
                      <Tooltip>
                        <FormattedMessage id="logout" />
                      </Tooltip>
                    }
                  >
                    <li onClick={() => setSidebarToggled(false)}>
                      <a
                        type="button"
                        onClick={handleLogout}
                        aria-label={formatMessage({ id: "logout" })}
                        className={account[1] === "settings" ? "active" : ""}
                      >
                        <LogoutIcon fill="#fff" />
                        {/* <SettingsIcon
                            fill={
                              account[1] === "settings" ? "#095183" : "#fff"
                            }
                          /> */}
                      </a>
                    </li>
                  </OverlayTrigger>
                ) : (
                  <li onClick={() => setSidebarToggled(false)}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      aria-label={formatMessage({ id: "logout" })}
                    >
                      <LogoutIcon fill="#fff" />
                      <span>
                        <FormattedMessage id="logout" />
                      </span>
                    </button>
                    {/* <Link href="/account/settings" >
                      <a className={account[1] === "settings" ? "active" : ""}>
                      <LogoutIcon fill="#fff" />
                        <span>
                        <FormattedMessage id="logout" />
                        </span>
                      </a>
                    </Link> */}
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      }
    </>
  );
};

export default Sidebar;
