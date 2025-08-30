import React, { useState } from "react";
import Image_Exported from "../assets/ImageExporter";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  // Sidebar
  const [IsSidebarOpen, setIsSidebarOpen]= useState(false);
  const handleSidebar = ()=>{
    setIsSidebarOpen(!IsSidebarOpen);
  }
  // Darkmode
  const {toggleDarkMode, darkMode} = useDarkMode();

  return (
    <div className="navigation">
      <nav className="navbar">
        <div className="nav-contain">
          <Link to='/' className="logo-contain">
            <i className="bx bx-code-alt"></i>
            <span className="nav-title"> Codewith Sanju</span>
          </Link>
          <ul className="nav-contents">
            <Link to='/profile' className="nav-items">profile</Link>
            <Link to='/services' className="nav-items">services</Link>
            <Link to='/books' className="nav-items">books</Link>
            <Link to='/projects' className="nav-items">projects</Link>
            <Link to='/fordev' className="nav-items">For Dev</Link>
            <Link to='/blog' className="nav-items">Blogs</Link>
          </ul>
        </div>
        <ul className="nav-toggle-contents">
          <Link to='/achievements' className="nav-toggle-items">Achievements</Link>
          <Link to='/resume' className="nav-toggle-items">Resume</Link>
          <Link to='/about' className="nav-toggle-items">About</Link>
          <li onClick={toggleDarkMode} className="nav-toggle-btn theme">
            <i className={`bx bx-${darkMode ? 'moon':'sun'}`}></i>
          </li>
          <li className="nav-toggle-btn toggle">
            <i onClick={handleSidebar} className={`bx bx-${IsSidebarOpen ? 'x': 'menu'}`}></i>
          </li>
        </ul>
      </nav>
      <aside className={`sidebar ${IsSidebarOpen ? "open": ''}`}>
        <Link to='/profile' onClick={handleSidebar} className="profile">
          <img src={Image_Exported.profile_picture} alt="Profile Picture" className="profile-picture" />
          <p className="profile-title">Sandeep Kumar</p>
        </Link>
        <ul className="side-list">
            <Link to='/services'  onClick={handleSidebar} className="side-items"><i className='bx bx-devices'></i> <span className="title-items-sidebar">Services</span></Link>
            <Link to='/books'  onClick={handleSidebar} className="side-items"><i className='bx bx-book-open'></i> <span className="title-items-sidebar">Books</span></Link>
            <Link to='/projects'  onClick={handleSidebar} className="side-items"><i className='bx bx-code-alt'></i> <span className="title-items-sidebar">Projects</span></Link>
            <Link to='/achievements'  onClick={handleSidebar} className="side-items"><i className='bx bx-trophy'></i> <span className="title-items-sidebar">Achievements</span></Link>
            <Link to='/resume'  onClick={handleSidebar} className="side-items"><i className='bx bx-file'></i> <span className="title-items-sidebar">Resume</span></Link>
            <Link to='/fordev'  onClick={handleSidebar} className="side-items"><i className='bx bx-code-alt'></i> <span className="title-items-sidebar">For Dev</span></Link>
            <Link to='/about'  onClick={handleSidebar} className="side-items"><i className='bx bx-user'></i> <span className="title-items-sidebar">About</span></Link>
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;
