import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class CarAdd extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //References to Input Fields
    this.inputMake = React.createRef();
    this.inputModel = React.createRef();
    this.inputYear = React.createRef();
    this.inputVIN = React.createRef();
    this.inputMSRP = React.createRef();
    this.inputPhoto = React.createRef();
    this.inputColor = React.createRef();
  }

  state = {
    car_make: "",
    car_model: "",
    car_year: "",
    VIN: "",
    MSRP: "",
    photo: "",
    color: "",
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // this.input.focus();
  }

  handleSubmit(e) {
    // Turn off default form handling
    e.preventDefault();

    const url = "https://afternoon-gorge-89132.herokuapp.com/api/cars";

    // basic validation

    if (!this.inputMake.current.value) {
      alert("'Make' is empty!");
    } else if (!this.inputModel.current.value) {
      alert("'Model' is empty!");
    } else if (!this.inputColor.current.value) {
      alert("'Colour' is empty!");
    } else if (isNaN(this.inputYear.current.value)) {
      alert("'Year' must be a number, like - 1999");
    } else if (!this.inputYear.current.value) {
      alert("'Year' is empty!");
    } else if (!this.inputVIN.current.value) {
      alert("'VIN Number' is empty!");
    } else if (!this.inputMSRP.current.value) {
      alert("'MSRP' is empty!");
    } else if (isNaN(this.inputMSRP.current.value)) {
      alert("Must be a number, no commas, like - 2000");
    } else if (!this.inputPhoto.current.value) {
      alert("'Photo' is empty!");
    } else {
      const newCar = {
        car_make: this.state.car_make,
        car_model: this.state.car_model,
        car_year: this.state.car_year,
        VIN: this.state.VIN,
        MSRP: this.state.MSRP,
        photo: this.state.photo,
        purchase_date: null,
        purchaser_name: null,
        purchaser_email: null,
        price_paid: null,
        color: this.state.color,
      };

      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      })
        .then((response) => {
          if (response.ok) {
            // Parse the response body as JSON
            return response.json();
          } else if (response >= 400 && response.status < 500) {
            // Error caused by the requestor
            throw Error(`HTTP ${response.status}, ${response.statusText}`);
          } else {
            // Some other situation
            throw Error(`HTTP ${response.status}, ${response.statusText}`);
          }
        })
        .then((responseData) => {
          // "responseData" is an object
          console.log(responseData);
          // The identifier "id" can be used to redirect
          this.props.history.push(`/cars`);
        })
        .catch((error) => {
          // Handles an error thrown above, as well as network general errors
          console.log(error);
        });
    }
  }

  render() {
    document.title = `Add New Car`;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Adding a new Car</h2>

            <br />
            <fieldset>
              <legend>Car Information</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="car_make">Make:</label>
                    <input
                      className="form-control"
                      id="car_make"
                      name="car_make"
                      ref={this.inputMake}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="car_model">Model:</label>
                    <input
                      className="form-control"
                      id="car_model"
                      name="car_model"
                      ref={this.inputModel}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                      className="form-control"
                      id="color"
                      name="color"
                      ref={this.inputColor}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="car_year">Year:</label>
                    <input
                      className="form-control"
                      id="car_year"
                      name="car_year"
                      ref={this.inputYear}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="VIN">Vin Number:</label>
                    <input
                      className="form-control"
                      id="VIN"
                      name="VIN"
                      ref={this.inputVIN}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="MSRP">MSRP:</label>
                  <input
                    className="form-control"
                    id="MSRP"
                    name="MSRP"
                    ref={this.inputMSRP}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="photo">Photo:</label>
                  <input
                    className="form-control"
                    id="photo"
                    name="photo"
                    ref={this.inputPhoto}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>
              </div>
            </fieldset>
            <hr />

            <div className="form-group">
              <div className="col-md-offset-10 col-md-3">
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Add Car
                </button>
                &nbsp;&nbsp;
                <Link className="btn btn-default" to="/cars">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CarAdd);
