const car_brand = require("../models/car_brand");

module.exports = {
  users: ['id','first_name', 'email'],
  parts: ['name', 'description'],
  car_brands: ['name', 'country'],
  // Add more models and their searchable fields here
};
