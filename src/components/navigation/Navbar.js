import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNdOpen, setIsNdOpen] = useState(false);
  const [isSdOpen, setIsSdOpen] = useState(false);
  const [isAOpen, setIsAdOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login status
  const user = {
    name: "Thakur lal bosak",
    avatar: <i className="bx bx-user"></i>, // Replace with actual avatar if available
  };

  const toggleNdBtn = () => setIsNdOpen(!isNdOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleSdBtn = () => setIsSdOpen(!isSdOpen);
  const toggleAdBtn = () => setIsAdOpen(!isAOpen);

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
                )}
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
            <li className="t-b-c-nav nav-toggle-btn">
              <i className="bx bx-menu"></i>
            </li>
          </ul>
        </div>
      </nav>
      <aside className="sidebar">
        <div className="s-user-contain">
          {isLoggedIn ? (
            <>
              <div className="side-logo">{user.avatar}</div>
              <span className="side-username">{user.name}</span>
            </>
          ) : (
            <span className="side-username">Login</span>
          )}
        </div>
        <ul className="side-contents">
          <li className="side-items">
            <i className="side-c-icon bx bx-devices"></i>
            <span className="side-c-title">services</span>
          </li>
          <li className="side-items">
            <i className="side-c-icon bx bx-book-open"></i>
            <span className="side-c-title">books</span>
          </li>
          <li className="side-items">
            <i className="side-c-icon bx bx-layers"></i>
            <span className="side-c-title">projects</span>
          </li>
          <li className="side-items">
            <i className="side-c-icon bx bx-comment"></i>
            <span className="side-c-title">blogs</span>
          </li>
          <div className="side-c-drop-container">
            <button className="side-c-drop-btn">
              <div className="side-c-title-db">
                <i className="bx bx-dots-horizontal-rounded"></i>
                <span className="side-inner-db-title">snapshot</span>
              </div>
              <i
                onClick={toggleSdBtn}
                className="side-c-db-btn bx-chevron-down"
              ></i>
            </button>
            {isSdOpen && (
              <ul className="side-s-d-contain">
                <li className="side-s-links">
                  <i className="bx bx-bulb"></i>
                  <span className="side-s-title">manifesto</span>
                </li>
                <li className="side-s-links">
                  <i className="bx bx-trophy"></i>
                  <span className="side-s-title">achievements</span>
                </li>
                <li className="side-s-links">
                  <i className="bx bx-id-card"></i>
                  <span className="side-s-title">resume</span>
                </li>
              </ul>
            )}
          </div>
          <li className="side-items">
            <i className="side-c-icon bx bx-code-alt"></i>
            <span className="side-c-title">for dev</span>
          </li>
          <li className="side-items">
            <i className="side-c-icon bx bx-info-circle"></i>
            <span className="side-c-title">about</span>
          </li>
          <div className="side-c-drop-container">
            <button className="side-c-drop-btn">
              <div className="side-c-title-db">
                <i className="bx bx-cog"></i>
                <span className="side-inner-db-title">Account</span>
              </div>
              <i
                onClick={toggleAdBtn}
                className="side-c-db-btn bx-chevron-down"
              ></i>
            </button>
            {isAOpen && (
              <ul className="side-s-d-contain">
                <li className="side-s-links">
                  <i className="bx bx-lock-alt"></i>
                  <span className="side-s-title">Change Password</span>
                </li>

                <li className="side-s-links">
                  <i className="bx bx-log-out"></i>
                  <span className="side-s-title">Logout</span>
                </li>

                <li className="side-s-links">
                  <i className="bx bx-user-x"></i>
                  <span className="side-s-title">Delete Account</span>
                </li>
              </ul>
            )}
          </div>
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;
