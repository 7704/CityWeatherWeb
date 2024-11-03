const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Register = new mongoose.model("Register", mongooseSchema);

module.exports = Register;
