import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class CarEdit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //References to Input Fields
    this.inputMake = React.createRef();
    this.inputModel = React.createRef();
    this.inputColor = React.createRef();
    this.inputYear = React.createRef();
    this.inputVIN = React.createRef();
    this.inputMSRP = React.createRef();
    this.inputPhoto = React.createRef();
    this.inputPurchaseDate = React.createRef();
    this.inputPurchaseName = React.createRef();
    this.inputPurchaseEmail = React.createRef();
    this.inputPricePaid = React.createRef();
  }

  // Class properties
  state = {
    cars: {},
    httpStatusCode: 0,
    httpStatusOk: false,
  };

  url = `https://afternoon-gorge-89132.herokuapp.com/api/cars/${this.props.id}`;

  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // Get one
    fetch(this.url)
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
        // Study the shape of the data in the reqres.in service
        this.setState({ cars: responseData });
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  handleSubmit(e) {
    // Turn off default form handling
    e.preventDefault();

    // For coding convenience
    const newCar = {
      _id: this.state.cars._id,
      car_make: this.inputMake.current.value,
      car_model: this.inputModel.current.value,
      car_year: this.inputYear.current.value,
      VIN: this.inputVIN.current.value,
      MSRP: this.inputMSRP.current.value,
      photo: this.inputPhoto.current.value,
      purchase_date: this.inputPurchaseDate.current.value,
      purchaser_name: this.inputPurchaseName.current.value,
      purchaser_email: this.inputPurchaseEmail.current.value,
      price_paid: this.inputPricePaid.current.value,
      color: this.inputColor.current.value,
      crash_status: this.state.cars.crash_status,
    };

    // Edit existing
    fetch(this.url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
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
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/cars/detail/${this.state.cars._id}`);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log("our error is here");
        console.log(error);
      });
  }

  render() {
    document.title = `Edit Cars ${this.props.id}`;

    // For coding convenience, create a shortcut object
    const v = this.state.cars;

    // If "this.input" exists (it will only get rendered if a form exists), set its focus

    return (
      <div>
        <h3>
          Edit car {v.car_make} model of {v.car_model}
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <fieldset>
                <legend>Vehicle Information</legend>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="car_make">Make:</label>
                      <input
                        className="form-control"
                        id="car_make"
                        name="car_make"
                        defaultValue={v.car_make}
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
                        defaultValue={v.car_model}
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
                        defaultValue={v.color}
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
                        defaultValue={v.car_year}
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
                        defaultValue={v.VIN}
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
                      defaultValue={v.MSRP}
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
                      defaultValue={v.photo}
                      ref={this.inputPhoto}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </fieldset>
              <hr />
              <fieldset>
                <legend>Purchase Information</legend>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="purchaser_name">Purchaser Name:</label>
                      <input
                        className="form-control"
                        id="purchaser_name"
                        name="purchaser_name"
                        defaultValue={v.purchaser_name}
                        ref={this.inputPurchaseName}
                        onChange={this.handleChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="purchaser_email">Purchaser Email:</label>
                      <input
                        className="form-control"
                        id="purchaser_email"
                        name="purchaser_email"
                        defaultValue={v.purchaser_email}
                        ref={this.inputPurchaseEmail}
                        onChange={this.handleChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="purchase_date">Purchase Date:</label>
                      <input
                        className="form-control"
                        id="purchase_date"
                        name="purchase_date"
                        defaultValue={v.purchase_date}
                        ref={this.inputPurchaseDate}
                        onChange={this.handleChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price_paid">Price Paid</label>
                      <input
                        className="form-control"
                        id="price_paid"
                        name="price_paid"
                        defaultValue={v.price_paid}
                        ref={this.inputPricePaid}
                        onChange={this.handleChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div
                      className="col-md-offset-10 col-md-3"
                      style={{ paddingBottom: "20px" }}
                    >
                      <button
                        onClick={this.handleSubmit}
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                      &nbsp;&nbsp;
                      <Link className="btn btn-default" to="/cars">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CarEdit);
