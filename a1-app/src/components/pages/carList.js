import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CarList extends Component {
  state = { cars: [] };

  componentDidMount() {
    const url = "https://afternoon-gorge-89132.herokuapp.com/api/cars";

    // Get all
    fetch(url)
      .then((response) => {
        // Parse the response body as JSON
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok,
        });

        if (response.ok) {
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
        this.setState({ cars: responseData });
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `List of cars`;
    return (
      <div style={{ padding: "20px 0px 20px 0px" }}>
        <h5>List of cars from a WEB API service</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Color</th>
              <th>MSRP</th>
            </tr>
          </thead>
          <TableBody cars={this.state.cars} />
        </table>
      </div>
    );
  }
}

function TableBody(props) {
  let rows = props.cars.map((car, index) => {
    return <TableRow car={car} key={index} />;
  });
  return <tbody>{rows}</tbody>;
}

function TableRow(props) {
  const c = props.car;

  return (
    <tr>
      <td>{c.car_make}</td>
      <td>{c.car_model}</td>
      <td>{c.car_year}</td>
      <td>{c.VIN}</td>
      <td>{c.color}</td>
      <td>{c.MSRP}</td>
      <td>
        <Link className="btn btn-default" to={`/cars/detail/${c._id}`}>
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-warning" to={`/cars/edit/${c._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-danger" to={`/cars/delete/${c._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
}
