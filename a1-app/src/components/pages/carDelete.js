import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class CarDelete extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { cars: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://afternoon-gorge-89132.herokuapp.com/api/cars/${this.props.id}`;

  // Get all
  componentDidMount() {
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
        // Optional...
        //console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  handleSubmit(e) {
        // Delete

    fetch(this.url, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the request.in service
        // Optional...
        console.log(responseData);
        // Redirect
        this.props.history.push("/cars");
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `Delete Car ${this.props.id}`;
    // For coding convenience, create a shortcut object
    const c = this.state.cars;
    return (
      <div style={{ padding: "20px 0px 20px 0px" }}>
        <h4>
          Delete car {c.car_make} Model of {c.car_model}.
        </h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Make</dt>
                <dd>{c.car_make}</dd>
                <dt>Model</dt>
                <dd>{c.car_model}</dd>
                <dt>Year</dt>
                <dd>{c.car_year}</dd>
                <dt>VIN</dt>
                <dd>{c.VIN}</dd>
                <dt>MSRP</dt>
                <dd>{c.MSRP}</dd>
                <dt>Photo</dt>
                <dd>{c.photo}</dd>
                <dt>Color</dt>
                <dd>{c.color}</dd>
              </dl>
            </div>
            <div className="col-md-2">
              <img src={c.photo} alt="" className="img-responsive" />
            </div>
          </div>
        ) : (
          <p>Requested car was not found</p>
        )}

        <hr />
        <p>
          Confirm that this car should be deleted, or cancel to return to the
          list of cars
        </p>
        <p>
          <button onClick={this.handleSubmit} className="btn btn-danger">
            Confirm delete
          </button>
          &nbsp;&nbsp;
          <Link className="btn btn-default" to="/cars">
            Cancel
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(CarDelete);
