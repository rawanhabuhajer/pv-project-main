import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import { handleImageLink } from "@/helpers/functions.js";
import Sidebar from "./Sidebar";
import MvCable from "./mvCableModule/Index";
import MvCableData from "./mvCableModule/MvCable copy";
import PvProjects from "./project/Index";
import PvSubProjects from "./project/subProject/SubprojectsPage";
import SubprojectDataPage from "./project/subProject/SubprojectDataPage";
import Dashboard from "./dashboard/Index";
import styles from "./styles/style.module.scss";
// import Logo from "./assets/images/newImages/newLogo.svg";
import Logo from "./assets/images/newImages/logo4.svg";
import Logo2 from "../account/assets/images/logoNew.svg";
import MenuIcon from "./assets/images/menu.svg";
import LogoutIcon from "./assets/images/newImages/logout.svg";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import { logoutUser } from "@/store/actions";
import { LogOut } from "lucide-react";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { account } = router.query;
  const cookies = parseCookies();
  const [searchFocused, setSearchFocused] = useState(false);
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [companyName, setCompanyName] = useState(false);
  const [companyPopup, setCompanyPopup] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const [startConversation, setStartConversation] = useState(false);
  const [tenderKeyWord, setTenderKeyWord] = useState("");

  const handleSearch = () => {
    let query = "";

    if (tenderKeyWord) {
      query += `tenderName=${tenderKeyWord}`;
    }

    setTenderKeyWord("");
    setSearchFocused(false);

    router.push(`/account/bank-info/result?${query}`);
  };

  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1200);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles["account-section"]} ${
          account[1] === "mv-cable" && account.length === 3
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
            startConversation={startConversation}
            isWideScreen={isWideScreen}
          />
        </>

        <div className={`account--content `}>
          <div
            className={`account--content--header ${
              account[1] === "mv-cable" && account.length === 3
                ? "mv-header"
                : ""
            }`}
          >
            <div className="logo">
              <div>
                <Logo2 fill="#fff" width={156} />
              </div>
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
                  <a> Home</a>
                </Link>
              </li>
              <li
                className={`menu-tab ${
                  account[1] === "pv-cable" ? "active" : ""
                } `}
              >
                <Link href={"/account/pv-cable"}>
                  <a>Pv cable</a>
                </Link>
              </li>
              <li
                className={`menu-tab ${
                  account[1] === "mv-cable" ? "active" : ""
                } `}
              >
                {" "}
                <Link href={"/account/mv-cable"}>
                  <a> Mv cable</a>
                </Link>
              </li>
              <li
                className={`menu-tab ${
                  account[1] === "contact-us" ? "active" : ""
                } `}
              >
                {" "}
                <Link href={"/account/contact-us"}>
                  <a> Contact us</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li
                onClick={() => {
                  dispatch(logoutUser({ cookies }));
                  destroyCookie("", "token", { path: "/" });
                  destroyCookie("", "userId", { path: "/" });
                  router.push(`/`);
                }}
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
