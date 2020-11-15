import React, { Component } from "react";
import { Link } from "react-router-dom";

class CarDetail extends Component {
  state = { cars: [], httpStatusCode: 0, httpStatusOk: false };

  componentDidMount() {
    const url = `https://afternoon-gorge-89132.herokuapp.com/api/cars/${this.props.id}`;
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
        this.setState({ cars: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `Car ${this.props.id} Details`;
    return (
      <div style={{ paddingTop: "20px " }}>
        <h5>
          Details about {this.state.cars.car_make} car model of{" "}
          {this.state.cars.car_model}.
        </h5>
        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Maker</dt>
                <dd>{this.state.cars.car_make}</dd>
                <dt>Model</dt>
                <dd>{this.state.cars.car_model}</dd>
                <dt>year</dt>
                <dd>{this.state.cars.car_year}</dd>
                <dt>VIN</dt>
                <dd>{this.state.cars.VIN}</dd>
                <dt>MSRP</dt>
                <dd>{this.state.cars.MSRP}</dd>
                <dt>Color</dt>
                <dd>{this.state.cars.color}</dd>
                <div className="col-md-2">
                  <img
                    src={this.state.cars.photo}
                    alt=""
                    className="img-responsive"
                  />
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <p>Requested user was not found</p>
        )}
        <hr />
        <p>
          <Link
            className="btn btn-warning"
            to={`/cars/edit/${this.state.cars._id}`}
          >
            Edit
          </Link>
          &nbsp;&nbsp;
          <Link className="btn btn-default" to="/cars">
            Show list of cars
          </Link>
        </p>
      </div>
    );
  }
}

export default CarDetail;
