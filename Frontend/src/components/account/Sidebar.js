import React from "react";

import Logo from "./assets/images/newImages/logo2.svg";
import SettingsIcon from "./assets/images/sidebar-icons/settings.svg";
import LogoutIcon from "./assets/images/sidebar-icons/logout.svg";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { destroyCookie, parseCookies } from "nookies";
import { logoutUser } from "@/store/actions";

import { FormattedMessage, useIntl } from "react-intl";
const Sidebar = ({
  sidebarToggled,
  setSidebarToggled,
  setCompanyPopup,
  companyPopup,
  setSuggestions,
}) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const router = useRouter();
  const { account } = router.query;
  const { formatMessage } = useIntl();
  const handleLogout = () => {
    dispatch(logoutUser({ cookies }));
    destroyCookie("", "token", { path: "/" });
    destroyCookie("", "userId", { path: "/" });
    router.push(`/`);
  };

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
                <li onClick={() => setSidebarToggled(false)}>
                  <Link href="/account/settings">
                    <a className={account[1] === "settings" ? "active" : ""}>
                      <SettingsIcon
                        fill={account[1] === "settings" ? "#111827" : "#fff"}
                      />
                      <span>
                        <FormattedMessage id="accountSettings" />
                      </span>
                    </a>
                  </Link>
                </li>

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
                </li>
              </div>
            </ul>
          </div>
        </div>
      }
    </>
  );
};

export default Sidebar;
