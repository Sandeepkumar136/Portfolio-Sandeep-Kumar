import React from "react";

const Navbar = () => {
  return (
    <div className="navigation">
      <nav className="navbar">
        <div className="nav-contain">
          <div className="logo-contain">
            <i className="bx bx-code-alt"></i>
            <span className="nav-title"> Codewith Sanju</span>
          </div>
          <ul className="nav-contents">
            <li className="nav-items">profile</li>
            <li className="nav-items">services</li>
            <li className="nav-items">books</li>
            <li className="nav-items">projects</li>
          </ul>
        </div>
        <ul className="nav-toggle-contents">
          <li className="nav-toggle-items">Achievements</li>
          <li className="nav-toggle-items">Resume</li>
          <li className="nav-toggle-items">About</li>
          <li className="nav-toggle-btn theme">
            <i className="bx bx-sun"></i>
          </li>
          <li className="nav-toggle-btn toggle">
            <i className="bx bx-menu"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
