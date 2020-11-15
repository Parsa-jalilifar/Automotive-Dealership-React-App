import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid navbar-outline">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand" style={{ color: "black" }}>
            Home Page
          </Link>
          <Link to="/cars" className="navbar-brand" style={{ color: "black" }}>
            Car List
          </Link>
          <Link
            to="/cars/add"
            className="navbar-brand"
            style={{ color: "black" }}
          >
            Add A Car
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
