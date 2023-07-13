import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <Link className="navbar-title" to="/">
        ポケモン図鑑
      </Link>
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
            <li>
              <Link className="navbar-link" to="/pokedex_kanto">
                カントー地方
              </Link>
            </li>
            <li>
              <Link className="navbar-link" to="/pokedex_johto">
                ジョウト地方
              </Link>
            </li>
            <li>
              <Link className="navbar-link" to="/pokedex_hoenn">
                ホウエン地方
              </Link>
            </li>
            <li>
              <Link className="navbar-link" to="/pokedex_sinnoh">
                シンオウ地方
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
