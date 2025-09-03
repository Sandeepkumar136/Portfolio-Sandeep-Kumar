import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNdOpen, setIsNdOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login status
  const user = {
    name: "Thakur lal bosak",
    avatar: <i className="bx bx-user"></i>, // Replace with actual avatar if available
  };

  const toggleNdBtn = () => setIsNdOpen(!isNdOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="navigation">
      <nav className="navbar">
        <div className="nav-r-contain">
          <Link to="/" className="nav-logo">
            <i className="bx bx-code-alt"></i>
            <span className="nav-title">Codewith Sanju</span>
          </Link>

          <ul className="nav-links">
            <li className="nav-contain">services</li>
            <li className="nav-contain">books</li>
            <li className="nav-contain">projects</li>
            <li className="nav-contain">blogs</li>
            <div className="n-d-d-btn-contain">
              <button className="nav-dropdown-btn">
                <div className="n-d-d-heading">Shapshot</div>
                <i
                  className="n-d-d-icon bx-chevron-down"
                  onClick={toggleNdBtn}
                ></i>
              </button>
              {isNdOpen && (
                <ul className="n-d-item-contain">
                  <li className="n-d-links">manifesto</li>
                  <li className="n-d-links">Achivements</li>
                  <li className="n-d-links">Resume</li>
                </ul>
              )}
            </div>
          </ul>
        </div>

        <div className="nav-l-contain">
          <ul className="nav-side-links">
              <li className="nav-s-contain">for dev</li>
              <li className="nav-s-contain">about</li>
            <li className="nav-s-drop-btn-c">
              <button className="dropdown-btn-n">
                {isLoggedIn ? (
                  <>
                    <div className="user-p-logo-n">{user.avatar}</div>
                    <span className="user-name-n">{user.name}</span>
                  </>
                ) : (
                  <span className="user-name-n">Login</span>
                )}{" "}
                <i
                  onClick={toggleDropdown}
                  className="bx  bx-chevron-down btn-s-n-db"
                ></i>
              </button>

              {isOpen && (
                <div className="drop-content-n">
                  {isLoggedIn ? (
                    <ul className="btn-s-n-db-c">
                      <li className="btn-s-n-item-db">change password</li>
                      <li className="btn-s-n-item-db">logout</li>
                      <li className="btn-s-n-item-db">delete account</li>
                    </ul>
                  ) : (
                    <ul className="btn-s-n-db-c">
                      <Link to="/login" className="btn-s-n-item-db">
                        Login
                      </Link>
                    </ul>
                  )}
                </div>
              )}
            </li>

          </ul>

          <ul className="toogle-btns-contain-n">
            <li className="t-b-c-nav">
              <i className="bx bx-moon"></i>
            </li>
            <li className="t-b-c-nav">
              <i className="bx bx-menu"></i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
