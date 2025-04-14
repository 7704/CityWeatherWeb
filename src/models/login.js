const mongoose = require("mongoose");
const Register = require("./register");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static method to authenticate user
loginSchema.statics.authenticateUser = async function (email, password) {
  try {
    const user = await Register.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
