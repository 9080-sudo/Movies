import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header({ search, setSearch }) {
  // <nav className="navbar">
  //   <div className="navbar-container">
  //     <h1 className="navbar-logo">Your Logo</h1>
  //     <div className={`navbar-links ${isOpen ? "active" : ""}`}>
  //       <a href="#home">Home</a>
  //       <a href="#about">About</a>
  //       <a href="#services">Services</a>
  //       <a href="#contact">Contact</a>
  //     </div>
  //     <div className="navbar-toggle" onClick={toggleNavbar}>
  //       asdf
  //       <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
  //     </div>
  //   </div>
  // </nav>;

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={classes["navbar"]}>
      <div className={classes["navbar-container"]}>
        <Link to="/" className={classes["link"]}>
          MovieDb
        </Link>
        <div
          className={`${classes["navbar-links"]} ${
            isOpen ? classes["active"] : ""
          }`}
        >
          <Link to="/popular" className={classes["link"]}>
            Popular
          </Link>
          <Link to="/top-rated" className={classes["link"]}>
            Top Rated
          </Link>
          <Link to="/upcoming" className={classes["link"]}>
            Upcoming
          </Link>
          <div>
            <input
              type="search"
              placeholder="Movie Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes["input"]}
            />
            <Link className={classes["search-btn"]} to="/search">
              Search
            </Link>
          </div>
        </div>
        <div className={classes["navbar-toggle"]} onClick={toggleNavbar}>
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
}
