import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = ({ toggleMenu }) => {
  return (
    <div className="header">
      <FaBars className="hamburger-icon" onClick={toggleMenu} />
      <FaSignOutAlt className="exit-icon" />
    </div>
  );
};

export default Header;
