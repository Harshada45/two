import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
function Navbar() {
  return (
    <>
      <nav className="navTab">
        <span className="logoText">Logo</span>
        <NavDropdown title="Home" id="nav-dropdown">
          <NavLink to="/dashboard/about">About</NavLink>
          <NavLink to="/dashboard/content">Content</NavLink>
        </NavDropdown>
        <NavLink to="/dashboard/task">Task</NavLink>
        <NavLink to="/dashboard/user">User</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
