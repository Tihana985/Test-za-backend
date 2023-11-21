const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must enter"]
  },
  adress: {
    type: String,
    required: [true, "Must enter"]
  },

});

const Academy = mongoose.model("Academy", academySchema);
module.exports = Academy;