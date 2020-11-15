// Data service operations setup
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Loading the schema
const carSchema = require("./carSchema.js");

// Collection properties, which get their values upon connecting to the database
let Cars;

module.exports = {
  /******************************************************************************
   * Initializes Connection to Database                                         *
   ******************************************************************************/
  initialize: function () {
    return new Promise((resolve, reject) => {
      //Set up default mongoose connection
      mongoose.connect(
        "mongodb+srv://pjalilifar:pass1234@assignment6-opghg.mongodb.net/test?retrywrites=true&w=majority",
        {
          dbName: "db-a1",
          connectTimeoutMS: 5000,
          useUnifiedTopology: true,
        }
      );
      //Get the default connection
      var db = mongoose.connection;
      //Bind connection to error event (to get notification of connection errors)
      db.on("error", (error) =>
        console.log("Connection error: ", error.message)
      );
      // Create a vehicle model from schema above.
      db.once("open", () => {
        Cars = db.model("vehicles", carSchema, "vehicles");
        resolve(console.log("Connection to the database was successful"));
      });
    });
  },

  /******************************************************************************
   * Retrieves list of all cars from the Database                               *
   ******************************************************************************/
  carGetAll: function () {
    return new Promise((resolve, reject) => {
      Cars.find()
        .sort({ car_make: "asc", car_model: "asc", car_year: "asc" })
        .exec((error, items) => {
          if (error) {
            return reject(console.log(error.message));
          }
          return resolve(items);
        });
    });
  },

  /******************************************************************************
   * Retrieves individual car by ID from the Database                           *
   ******************************************************************************/
  carGetById: function (itemId) {
    return new Promise((resolve, reject) => {
      Cars.findById(itemId, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Retrieves individual car by VIN from the Database                          *
   ******************************************************************************/
  carGetByVin: function (vinNum) {
    return new Promise((resolve, reject) => {
      Cars.findOne({ VIN: vinNum }, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Add Vehicle to the Database                                                *
   ******************************************************************************/
  carAdd: function (newItem) {
    return new Promise((resolve, reject) => {
      Cars.create(newItem, (error, item) => {
        if (error) {
          return reject(error.message);
        }
        return resolve(item);
      });
    });
  },

  /******************************************************************************
   * Edit existing car from the Database                                    *
   ******************************************************************************/
  carEdit: function (newItem) {
    return new Promise((resolve, reject) => {
      Cars.findByIdAndUpdate(
        newItem._id,
        newItem,
        { new: true },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }
          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Delete car from the Database                                               *
   ******************************************************************************/
  carDelete: function (itemId) {
    return new Promise(function (resolve, reject) {
      Cars.findByIdAndRemove(itemId, (error) => {
        if (error) {
          return reject(error.message);
        }
        return resolve();
      });
    });
  },
}; // end of module.exports
