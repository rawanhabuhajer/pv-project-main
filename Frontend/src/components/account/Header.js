import React from "react";
import Logo from "./assets/images/logo.svg";
import MenuIcon from "./assets/images/menu.svg";
import Image from "next/future/image";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";

const Header = ({ sidebarToggled, setSidebarToggled }) => {
  return (
    <div className="account-header">
      <div className="logo">
        <div>
          <Logo fill="#fff" width={120} />
        </div>
      </div>
      <button type="button" onClick={() => setSidebarToggled(!sidebarToggled)}>
        <MenuIcon fill="#fff" />
      </button>
    </div>
  );
};

export default Header;
