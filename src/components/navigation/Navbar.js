import React, { useState } from "react";
import Image_Exported from "../assets/ImageExporter";

const Navbar = () => {
  const [IsSidebarOpen, setIsSidebarOpen]= useState(false);
  const handleSidebar = ()=>{
    setIsSidebarOpen(!IsSidebarOpen);
  }

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
            <i onClick={handleSidebar} className={`bx bx-${IsSidebarOpen ? 'x': 'menu'}`}></i>
          </li>
        </ul>
      </nav>
      <aside className={`sidebar ${IsSidebarOpen ? "open": ''}`}>
        <div onClick={handleSidebar} className="profile">
          <img src={Image_Exported.profile_picture} alt="Profile Picture" className="profile-picture" />
          <p className="profile-title">Sandeep Kumar</p>
        </div>
        <ul className="side-list">
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-devices'></i> <span className="title-items-sidebar">Services</span></li>
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-book-open'></i> <span className="title-items-sidebar">Books</span></li>
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-code-alt'></i> <span className="title-items-sidebar">Projects</span></li>
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-trophy'></i> <span className="title-items-sidebar">Achievements</span></li>
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-file'></i> <span className="title-items-sidebar">Resume</span></li>
            <li  onClick={handleSidebar} className="side-items"><i class='bx bx-user'></i> <span className="title-items-sidebar">About</span></li>
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;
