const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must enter"]
  },
  adress: {
    type: String,
    required: [true, "Must enter"]
  },

  location: {
    type: String,
  },

});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;