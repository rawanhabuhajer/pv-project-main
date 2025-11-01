import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import MvCable from "./mvCableModule/Index";
import MvSubcategories from "./mvCableModule/sub-categories/SubCategoriesMain";
import MvCableData from "./mvCableModule/MvCable copy";
import PvProjects from "./project/Index";
import PvSubProjects from "./project/subProject/SubprojectsPage";
import SubprojectDataPage from "./project/subProject/SubprojectDataPage";
import Dashboard from "./dashboard/Index";
import styles from "./styles/style.module.scss";

import Logo2 from "../account/assets/images/logoLast.svg";
import MenuIcon from "./assets/images/menu.svg";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import { logoutUser } from "@/store/actions";
import { LogOut } from "lucide-react";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { account } = router.query;
  const cookies = parseCookies();
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [companyName, setCompanyName] = useState(false);
  const [companyPopup, setCompanyPopup] = useState(false);
  const [suggestions, setSuggestions] = useState(false);

  return (
    <>
      <div
        className={`${styles["account-section"]} ${
          account[1] === "mv-cable" && account.length === 4
            ? styles["mv-bg"]
            : ""
        }`}
      >
        <>
          <Sidebar
            sidebarToggled={sidebarToggled}
            setSidebarToggled={setSidebarToggled}
            companyName={companyName}
            setCompanyName={setCompanyName}
            setCompanyPopup={setCompanyPopup}
            companyPopup={companyPopup}
            setSuggestions={setSuggestions}
            suggestions={suggestions}
          />
        </>

        <div className={`account--content `}>
          <div
            className={`account--content--header ${
              account[1] === "mv-cable" && account.length === 4
                ? "mv-header"
                : ""
            }`}
          >
            <div className="logo">
              <Link href={"/"}>
                <a>
                  <Logo2 fill="#fff" width={156} />
                </a>
              </Link>
            </div>
            <ul>
              <li
                className={`menu-tab ${
                  account[0] === "account" && account.length === 1
                    ? "active"
                    : ""
                } `}
              >
                <Link href={"/account"}>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li
                className={`menu-tab ${
                  account[1] === "pv-cable" ? "active" : ""
                } `}
              >
                <Link href={"/account/pv-cable"}>
                  <a>PV Cable</a>
                </Link>
              </li>
              <li
                className={`menu-tab ${
                  account[1] === "mv-cable" ? "active" : ""
                } `}
              >
                {" "}
                <Link href={"/account/mv-cable"}>
                  <a> MV Cable</a>
                </Link>
              </li>
              {/* <li
                className={`menu-tab ${
                  account[1] === "contact-us" ? "active" : ""
                } `}
              >
                {" "}
                <Link href={"/account/contact-us"}>
                  <a> Contact us</a>
                </Link>
              </li> */}
            </ul>
            <ul>
              <li
                onClick={() => {
                  dispatch(logoutUser({ cookies }));
                  destroyCookie("", "token", { path: "/" });
                  destroyCookie("", "userId", { path: "/" });
                  router.push(`/`);
                }}
                className="logout-btn"
              >
                Logout &nbsp;
                <LogOut />
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setSidebarToggled(!sidebarToggled)}
              className="menu--icon"
            >
              <MenuIcon fill="#fff" />
            </button>
          </div>

          <div className="account--content--body">
            {account[0] === "account" && account.length == 1 && <Dashboard />}
            {account[1] === "pv-cable" && account.length == 2 && <PvProjects />}
            {account[1] === "projects" && account.length == 3 && (
              <PvSubProjects />
            )}
            {account[1] === "projects" &&
              account[3] === "subprojects" &&
              account.length == 5 && <SubprojectDataPage />}
            {account[1] === "mv-cable" && account.length == 2 && <MvCable />}
            {account[1] === "mv-cable" && account.length == 3 && (
              <MvSubcategories />
            )}
            {account[1] === "mv-cable" && account.length == 4 && (
              <MvCableData />
            )}
          </div>
        </div>
        <div
          className={
            sidebarToggled ? "account--overlay active" : "account--overlay"
          }
          onClick={() => {
            setSidebarToggled(false);
          }}
        ></div>
      </div>
    </>
  );
};

export default Index;
