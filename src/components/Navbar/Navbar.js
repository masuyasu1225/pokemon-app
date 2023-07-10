import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar-title">ポケモン図鑑</nav>
      <button
        className={`hamburger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      {isOpen && (
        <div className="menu">
          <ul>
            <li>メニュー1</li>
            <li>メニュー2</li>
            <li>メニュー3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
