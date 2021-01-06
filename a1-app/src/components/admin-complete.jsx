import React, { Component } from "react";
import CarouselMaker from "./carouselMaker";
import { Container } from "react-bootstrap";
import * as BiIcons from "react-icons/bi";
import "../styles/more_completed_project.css";

class Admin_Completed_Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const hrStyle = {
      display: "block",
      marginTop: "5px",
      marginBottom: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "2px",
      backgroundColor: "white",
    };

    return (
      <Container>
        <a className="icon-link" href="/">
          <BiIcons.BiArrowBack className="back-icon" />
        </a>
        <h3 style={{ padding: "20px 0px 5px 12px" }}>Completed Projects</h3>
        <hr style={hrStyle}></hr>
        <CarouselMaker
          url={`https://bdcustompa-api.herokuapp.com/api/completed_projects`}
        />
      </Container>
    );
  }
}

export default Admin_Completed_Projects;
