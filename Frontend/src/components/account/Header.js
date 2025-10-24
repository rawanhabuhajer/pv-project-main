import React from "react";
import Logo from "./assets/images/logo.svg";
import MenuIcon from "./assets/images/menu.svg";

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
