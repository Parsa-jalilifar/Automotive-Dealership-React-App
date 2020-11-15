/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    document.title = `Home Page`;
    return (
      <div style={{ paddingTop: "20px" }}>
        <p> You need two standard hyperlinks here</p>
        <p>
          Web API link:
          <a href="https://afternoon-gorge-89132.herokuapp.com/api"> api</a>
        </p>
        <p>
          Web App link:
          <a href="https://a1-app.herokuapp.com/"> app</a>
        </p>
      </div>
    );
  }
}

export default Home;
