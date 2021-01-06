import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as AiIcons from "react-icons/ai";
import "../styles/preview.css";

class previewComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed_projects: [],
    };
  }

  componentDidMount() {
    const url = `https://bdcustompa-api.herokuapp.com/api/completed_projects`;

    // Get all
    fetch(url)
      .then((response) => {
        // Optional...
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok,
        });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found
          throw Error("HTTP 404, Not found");
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the rearers.in service
        this.setState({ completed_projects: responseData });

        // console.log(responseData);

        // Optional...
        // console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    const hrStyle = {
      display: "block",
      marginTop: "10px",
      marginBottom: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "1px",
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
      <div className="container" id="com-frame" style={{ paddingTop: "40px" }}>
        <h3 className="preview_title">Completed Projects</h3>
        <h4 className="preview_more">
          <Link style={{textDecoration:'none'}} to="/More_completed_project">
            <ColorButton size="large" variant="contained" color="primary">
              {" "}
              <AiIcons.AiOutlinePlus />
              &nbsp; More
            </ColorButton>
          </Link>
        </h4>
        <hr style={hrStyle}></hr>
        <ProjectItem cars={this.state.completed_projects} />
      </div>
    );
  }
}

export default previewComplete;

function ProjectItem(props) {
  let rows = props.cars.slice(0, 3).map((car, index) => {
    return <CarouselItems car={car} key={index} />;
  });
  return rows;
}

function CarouselItems(props) {
  const c = props.car;
  return (
    <div className="carousel-frame">
      <ul>
        <li id="first-label">
          <span style={{ fontWeight: "bold" }}>Make: </span>
          <span style={{ fontWeight: "normal" }}>{c.Make}</span>
        </li>
        <hr className="item-border" />
        <li>
          <span style={{ fontWeight: "bold" }}>Model: </span>
          <span style={{ fontWeight: "normal" }}> {c.Model}</span>
        </li>
        <hr className="item-border" />
        <li>
          <span style={{ fontWeight: "bold" }}>Year: </span>
          <span style={{ fontWeight: "normal" }}> {c.Year}</span>
        </li>
        <hr className="item-border" />
        <li>
          <span style={{ fontWeight: "bold" }}>Body Style: </span>
          <span style={{ fontWeight: "normal" }}> {c.Body_Style}</span>
        </li>
        <hr className="item-border" />
        <li>
          <span style={{ fontWeight: "bold" }}>Engine Transmission: </span>
          <br />
          <span style={{ fontWeight: "normal" }}> {c.Engine_Transmission}</span>
        </li>
      </ul>
      <Carousel className="carousel-div" interval={null}>
        {c.Images.map((url) => {
          return (
            <Carousel.Item>
              <img
                id="image-item"
                className="d-block w-100"
                alt={c.Make}
                src={`data:image/jpeg;base64,${url}`}
              />

              <Carousel.Caption id="image-caption">
                <p id="inner-caption">{c.Description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
