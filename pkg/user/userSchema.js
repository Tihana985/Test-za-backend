const mongoose = require("mongoose");
// npm install validator
const validator = require("validator");// dali imalot e vistinski
// npm install bcryptjs
const bcrypt = require("bcryptjs"); // da go enkriptimrrame passwordot

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, 
    lowercase: true, 
    validate: [validator.isEmail, "Prease provide a valid email"], // validacija dali vrednosta e vistinki email
  },

  password: {
    type: String,
    required: [true, "Passwod is required"],
    minlength: [9, "Password must be at least 9 characters long"],
  },
});


//* Middlemare delot koga gi dobivame podatocite i  koga gi stavame vo database
userSchema.pre("save", async function (next) {
  // so ovaa metoda na prevremen return sprecuvame da se aktivira celosnata funkcija ako uslovot e ispolnet
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;