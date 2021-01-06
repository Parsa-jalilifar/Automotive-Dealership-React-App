import { Form, Button, Container, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "../styles/inquiries.css";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(4),
      width: '25ch',
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '&& .MuiInput-root': {
      color: "white",
    },
    '&& .MuiInput-root:hover::before': {
      borderColor: "black",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
  },
  floatingLabelFocusStyle: {
    color: "White",
  },
});


const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class Inquiries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Date: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone_Number: "",
      Description: "",
      showModal: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ showModal: false });
  }


  handleShow() {
    this.setState({ showModal: true });
  }

  handleSubmit() {
    const URL = "https://bdcustompa-api.herokuapp.com/api/inquiries";

    const date = Date.now();

    const today = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    const newInquiry = {
      Date: today,
      Name: this.state.FirstName + " " + this.state.LastName,
      Email: this.state.Email,
      Phone_Number: this.state.Phone_Number,
      Description: this.state.Description,
    };

    // Authenticate user creds + verify permission
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInquiry),
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
        this.handleClose();
        window.scroll(0, 0);
        window.location.reload();
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {

    const { classes } = this.props;

    //styles
    const titleStyle = {
      fontSize: "26px",
      fontWeight: "300",
      padding: " 20px 0px 15px 0px",
    };
    const hrStyle = {
      display: "block",
      marginTop: "30px",
      marginBottom: "10px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "1px",
      backgroundColor: "#333",
    };

    const hrStyle_2 = {
      display: "block",
      marginTop: "5px",
      marginBottom: "30px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "1px",
      backgroundColor: "white",
    };


    // submit button state
    const isDisabled =
      this.state.FirstName.length === 0 ||
      this.state.LastName.length === 0 ||
      this.state.Email.length === 0 ||
      this.state.Phone_Number.length === 0 ||
      this.state.Description.length === 0;

    return (
      <Container id="inquiries-form">
        <header className="inquiries-title">Inquiries</header>
        <hr style={hrStyle_2}></hr>
        <Container className="outer-form-container">
          <Container className="form-container">
            <Form>
              <h4 style={titleStyle}> 1. Please Enter Your Information </h4>
              <p id="des">
                (We need some basic information from you in order to contact you
                once you've reached out to us.)
              </p>
              <form noValidate className={classes.root} autoComplete="off">
                <TextField id="First-Name" InputLabelProps={{ className: classes.floatingLabelFocusStyle, }} label="First Name"
                  onChange={(e) => this.setState({ FirstName: e.target.value })}
                />
                <TextField id="Last-Name" InputLabelProps={{ className: classes.floatingLabelFocusStyle, }} label="Last Name"
                  onChange={(e) => this.setState({ LastName: e.target.value })}
                />
                <Container style={{ margin: "0px auto" }}></Container>
                <TextField id="Email-Address" InputLabelProps={{ className: classes.floatingLabelFocusStyle, }} label="Email Address"
                  onChange={(e) => this.setState({ Email: e.target.value })}
                />
                <TextField id="Phone-Number" InputLabelProps={{ className: classes.floatingLabelFocusStyle, }} label="Phone Number"
                  onChange={(e) => this.setState({ Phone_Number: e.target.value })}
                />
              </form>
              <hr style={hrStyle}></hr>
              <h4 style={titleStyle}> 2. Project Description </h4>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                onChange={(e) => this.setState({ Description: e.target.value })}
              >
                <p id="des">
                  (Please provide some simple details about your current
                  vehicle, and describe what kind of modifications you would
                  like to make.)
                </p>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </Form>
            <Button
              size="lg"
              variant="dark"
              type="submit"
              disabled={isDisabled}
              onClick={this.handleShow}
            >
              Submit
            </Button>
          </Container>
        </Container>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textDecoration: "underline" }}><b>Please Confirm Inquiry Submission</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><b>Name: </b> {this.state.FirstName + " "}{this.state.LastName} </p>
            <p><b>Email: </b> {this.state.Email}</p>
            <p><b>Phone Number: </b> {this.state.Phone_Number}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            <Button variant="dark" onClick={this.handleSubmit}> Submit Inquiry</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default withStyles(styles)(withRouter(Inquiries));

/*<Modal.FormText>Name: { this.state.FirstName + " "}{this.state.LastName}</Modal.FormText>
/* <Modal.FormText>Email: {this.state.Email}</Modal.FormText>
<Modal.FormText>Phone Number: {this.state.Phone_Number}</Modal.FormText> */

/*
<Form.Group controlId="formHorizontalEmail">
<Form.Label>Email:</Form.Label>
<Col sm={7}>
  <Form.Control
    type="email"
    placeholder="example@gmail.com"
    onChange={(e) => this.setState({ Email: e.target.value })}
  />
  <FormText>So we can reach out to you via email.</FormText>
</Col>
</Form.Group>
*/


/*
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>First Name: </Form.Label>
                  <Form.Control
                    placeholder="first name"
                    style={{ marginLeft: "15px" }}
                    onChange={(e) =>
                      this.setState({ FirstName: e.target.value })
                    }
                  />
                </Col>
                <Col>
                  <Form.Label>Last Name: </Form.Label>
                  <Form.Control
                    placeholder="last name"
                    style={{ marginLeft: "15px" }}
                    onChange={(e) =>
                      this.setState({ LastName: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
*/

/* <FormControl>
<InputLabel style={{color: "white", fontSize: "14px", marginBottom:"20px"}} htmlFor="formatted-text-mask-input"></InputLabel>
<Input
name="textmask"
id="formatted-text-mask-input"
inputComponent={TextMaskCustom}
style={{marginBottom:"-40px"}}
/>
</FormControl> */