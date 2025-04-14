const mongoose = require("mongoose");

// Define the schema for user registration
const mongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  confirmpassword: {
    type: String,
    required: [true, "Confirm password is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be greater than 0"]
  }
}, {
  timestamps: true
});

// Create the model
const Register = mongoose.model("Register", mongooseSchema);

module.exports = Register;
