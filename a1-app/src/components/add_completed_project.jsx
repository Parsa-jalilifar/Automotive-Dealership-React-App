import {Form, FormText, Col, Button, Container, FormGroup} from "react-bootstrap";
import React, { Component } from "react";
import "../styles/add_completed_project.css";
import * as BiIcons from "react-icons/bi";
import {withRouter} from 'react-router-dom';

class Add_Completed_Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Make: "",
      Model: "",
      Year: "",
      Color: "",
      Body_Style: "",
      Engine_Transmission: "",
      Description: "",
      fileNumber: 0,
      Images: [],
    };

    this.onButtonChange = this.onButtonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.history.push("/");
  }

  handleSubmit() {
    const URL = "https://bdcustompa-api.herokuapp.com/api/completed_projects";

    var formData = new FormData();
    formData.append("Make", this.state.Make);
    formData.append("Model", this.state.Model);
    formData.append("Year", this.state.Year);
    formData.append("Color", this.state.Color);
    formData.append("Body_Style", this.state.Body_Style);
    formData.append("Engine_Transmission", this.state.Engine_Transmission);
    formData.append("Description", this.state.Description);
    for (const image of this.state.Images) {
      formData.append("Images", image, image.name);
    }

    // Authenticate user creds + verify permission
    fetch(URL, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("Token")
      }
    })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an object
        console.log(responseData.message);
        this.props.history.push(`/admin_completed_projects`);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  onButtonChange = (event) => {
    const files = event.target.files;
    document.getElementById("file-chosen").textContent = "Selected Files: ";

    for (var i = 0; i < files.length; i++) {
      if (i + 1 !== files.length) {
        document.getElementById("file-chosen").textContent +=
          " '" + files[i].name + "', ";
      } else {
        document.getElementById("file-chosen").textContent +=
          " '" + files[i].name + "'. ";
      }
    }

    this.setState({ Images: event.target.files });
  };

  render() {
    //styles
    const titleStyle = {
      color: "#333",
      fontSize: "26px",
      fontWeight: "520",
      padding: " 20px 0px 15px 0px",
    };
    const hrStyle = {
      display: "block",
      marginTop: "30px",
      marginBottom: "10px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "2px",
      backgroundColor: "#333",
    };

    // this state
    const isDisabled =
      this.state.Make.length === 0 ||
      this.state.Model.length === 0 ||
      this.state.Year.length === 0 ||
      this.state.Color.length === 0 ||
      this.state.Body_Style.length === 0 ||
      this.state.Body_Style.length === 0 ||
      this.state.Engine_Transmission.length === 0 ||
      this.state.Images.length === 0;

    return (
      <Container id="Add-Completed-Frame" style={{ paddingTop: "20px" }}>
        <a className="icon-link" href="/">
          <BiIcons.BiArrowBack className="back-icon" />
        </a>
        <header className="title">Add Completed Project</header>
        <Container className="outer-form-container">
          <Container className="form-container">
            <Form>
              <h4 style={titleStyle}> Vehicle Specifications </h4>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Make: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) => this.setState({ Make: e.target.value })}
                  />
                  <FormText>Make of the vehicle</FormText>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Model: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) => this.setState({ Model: e.target.value })}
                  />
                  <FormText>Model of the vehicle</FormText>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Year: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) => this.setState({ Year: e.target.value })}
                  />
                  <FormText>Year of the vehicle</FormText>
                </Form.Group>
              </Form.Row>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Color: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) => this.setState({ Color: e.target.value })}
                  />
                  <FormText>Specific name of the vehicle's color</FormText>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Body Style: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ Body_Style: e.target.value })
                    }
                  />
                  <FormText>Body classification of the vehicle</FormText>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Engine Transmission: </Form.Label>
                  <Form.Control
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ Engine_Transmission: e.target.value })
                    }
                  />
                  <FormText>Generalized engine specifications</FormText>
                </Form.Group>
              </Form.Row>
              <hr style={hrStyle}></hr>
              <h4 style={titleStyle}> Project Description </h4>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                onChange={(e) => this.setState({ Description: e.target.value })}
              >
                <FormText>
                  A descriptive explanation of the modifications made.
                </FormText>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
              <hr style={hrStyle}></hr>
              <h4 style={titleStyle}> Vehicle Image Album </h4>
              <FormGroup>
                <Form.File
                  id="imageUploader"
                  multiple
                  hidden
                  onChange={this.onButtonChange}
                />
                <input type="file" id="actual-btn" hidden />
                <label className="label-uploader" for="imageUploader">
                  {" "}
                  Choose Images
                </label>
                <span style={{ paddingLeft: "15px" }} id="file-chosen">
                  No Files Chosen
                </span>
              </FormGroup>
            </Form>
            <hr style={hrStyle}></hr>
            <Button
              style={{ borderRadius: "24px", marginTop: "25px" }}
              size="lg"
              variant="dark"
              type="submit"
              disabled={isDisabled}
              onClick={this.handleSubmit}
            >
              Add Project
            </Button>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default withRouter(Add_Completed_Project);
