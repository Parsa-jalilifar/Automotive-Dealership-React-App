// Setup
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Entity schema
var carSchema = new Schema({
  car_make: String,
  car_model: String,
  car_year: Number,
  VIN: String,
  MSRP: String,
  photo: String,
  purchase_date: String,
  purchaser_name: String,
  purchaser_email: String,
  price_paid: String,
  crash_status: Boolean,
  color: String,
});

// Make schema available to the application
module.exports = carSchema;
