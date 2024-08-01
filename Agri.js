const mongoose = require('mongoose');

const AgriSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const AgriModel = mongoose.model("Agris", AgriSchema);
module.exports = AgriModel;
