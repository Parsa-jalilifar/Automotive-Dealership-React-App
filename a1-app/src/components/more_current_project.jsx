import React, { Component } from "react";
import CarouselMaker from "./carouselMaker";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import * as AiIcons from "react-icons/ai";
import Button from "@material-ui/core/Button";
import "../styles/more_completed_project.css";

class more_completed_projects extends Component {
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

    const ColorButton = withStyles((theme) => ({
      root: {
        borderColor: "white",
        backgroundColor: "#626262",
        "&:hover": {
          backgroundColor: "#333",
        },
      },
    }))(Button);

    return (
      <div className="container" style={{ paddingTop: "40px" }}>
         <Link style={{textDecoration:'none'}} to="/">
            <ColorButton size="large" variant="contained" color="primary">
              {" "}
              <AiIcons.AiOutlineArrowLeft />
              &nbsp; Back
            </ColorButton>
          </Link>
        <h3 style={{ padding: "20px 0px 5px 12px" }}>Current Projects</h3>
        <hr style={hrStyle}></hr>
        <CarouselMaker
          url={`https://bdcustompa-api.herokuapp.com/api/current_projects`}
        />
      </div>
    );
  }
}

export default more_completed_projects;
