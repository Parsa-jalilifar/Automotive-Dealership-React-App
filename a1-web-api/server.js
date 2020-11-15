/**********************************************************************************
 * Web service setup                                                              *
 **********************************************************************************/
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const manager = require("./manager.js"); //MongoDB Data model and API request handling.

app.use(bodyParser.json()); // Add support for incoming JSON entities.
app.use(cors()); // Add support for CORS.

app.use(bodyParser.urlencoded({ extended: true }));

/**********************************************************************************
 * Deliver the app's home page to browser clients                                 *
 **********************************************************************************/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

/**********************************************************************************
 * Resources available in this web API                                            *
 **********************************************************************************/
app.get("/api", (req, res) => {
  const links = [];
  links.push({
    rel: "collection",
    href: "/api/cars",
    methods: "GET,POST,DELETE",
  });
  const linkObject = {
    apiName: "Car Manager API Version 1",
    apiVersion: "1.0",
    links: links,
  };
  res.json(linkObject);
});

// Getting all the cars
app.get("/api/cars", (req, res) => {
  manager
    .carGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get one car by its Id
app.get("/api/cars/:carId", (req, res) => {
  manager
    .carGetById(req.params.carId)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Get one car by its VIN
app.get("/api/cars/vin/:carVIN", (req, res) => {
  manager
    .carGetByVin(req.params.carVIN)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add a new car
app.post("/api/cars", (req, res) => {
  manager
    .carAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Edit existing car
app.put("/api/cars/:carId", (req, res) => {
  manager
    .carEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Delete existing car
app.delete("/api/cars/:carId", (req, res) => {
  manager
    .carDelete(req.params.carId)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

/*** Resource not found (this should be at the end) ***/
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

/*** Attempt to connect to the database, and tell the app to start listening for requests ***/
manager
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () =>
      console.log(`Ready to handle requests on port: ${HTTP_PORT}`)
    );
  })
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });
