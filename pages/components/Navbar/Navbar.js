import React, { useEffect, useState } from "react";
import Link from "next/link";
const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // The useEffect hook runs on the client side after the component mounts.
    // You can safely check for localStorage here.
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/welcome/">
          RoastHub
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
              <Link className="nav-link" href="/recipt/waterloo">
                Waterloo
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/kitchener">
                Kitchener
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/toronto">
                Toronto
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="/recipt/mississauga">
                Mississauga
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" href="/upload/">
                  Upload
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" href="/recipt/uploadHistory">
                  MyUpload
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            {!isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" href="/login/">
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" href="/login/logout">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
