import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/welcome/">
          Food Lover
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/breakfast">
                Breakfast
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/lunch">
                Lunch
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/dinner">
                Dinner
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/snack">
                Snack
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" href="/login/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
