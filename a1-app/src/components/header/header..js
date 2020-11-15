import React, { Component } from "react";
import NavBar from "./NavBar";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header" style={{ background: "grey" }}>
        <div style={{ padding: 25 }}>
          <h2>Assignment 1</h2>
          <p>
            The purpose of this app is to display the usage of the React
            Framework
          </p>
        </div>
        <div style={{ background: "white" ,border:"2px solid grey"}}>
          <NavBar className="navbar navbar-default"  />
        </div>
      </div>
    );
  }
}

export default Header;
