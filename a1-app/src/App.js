import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header.";
import Home from "./components/pages/home";
import CarList from "./components/pages/carList";
import CarAdd from "./components/pages/carAdd";
import CarDetail from "./components/pages/carDetail";
import CarEdit from "./components/pages/carEdit";
import CarDelete from "./components/pages/carDelete";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cars" component={CarList} />
          <Route exact path="/cars/add" component={CarAdd} />
          <Route
            exact
            path="/cars/detail/:id"
            render={(props) => <CarDetail id={props.match.params.id} />}
          />
          <Route
            exact
            path="/cars/edit/:id"
            render={(props) => <CarEdit id={props.match.params.id} />}
          />
          <Route
            exact
            path="/cars/delete/:id"
            render={(props) => <CarDelete id={props.match.params.id} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

// Function component for a content area
const NotFound = () => {
  return (
    <div style={{ marginTop: "10px" }}>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
};
