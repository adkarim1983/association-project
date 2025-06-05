const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  image: String,
  site: String,
});

module.exports = mongoose.model("Project", projectSchema);
