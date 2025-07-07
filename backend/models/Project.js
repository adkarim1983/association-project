const mongoose = require("mongoose");

const descriptionSectionSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema({
  id: Number, // Optional: can be omitted if MongoDB's _id is enough
  name: { type: String, required: true },
  category: String,
  location: String,
  lat: Number,
  lng: Number,
  image: String,
  descriptionSections: [descriptionSectionSchema],
});

module.exports = mongoose.model("Project", projectSchema);
