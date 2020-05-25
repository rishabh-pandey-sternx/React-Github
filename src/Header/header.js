import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import "./header.css";

function Header() {
  return (
    <div className="App-header">
      <div className="col-md-3 icon-logo">
        <div className="col-md-3">
          <img src={logo} alt="logo" className="App-logo" />
        </div>
        <div className="col-md-9 user">
          <div className="logo-text">Github user</div>
        </div>
      </div>
      <div className="col-md-6" />
      <div className="col-md-1 borderRight">
        <Link className="link-text" to="/">
          Home
        </Link>
      </div>
      <div className="col-md-1 borderRight">
        <Link className="link-text" to="/users">
          Users
        </Link>
      </div>
      <div className="col-md-1">
        <Link className="link-text" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Header;
