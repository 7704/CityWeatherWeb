const mongoose = require("mongoose");

// Create a schema for logout tracking (optional, for analytics or security purposes)
const logoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  logoutTime: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
  userAgent: String,
});

// Create a model for logout tracking
const Logout = mongoose.model("Logout", logoutSchema);

// Method to log logout activity
const logLogout = async (userId, ipAddress, userAgent) => {
  try {
    const logoutRecord = new Logout({
      userId,
      ipAddress,
      userAgent,
    });
    await logoutRecord.save();
    return true;
  } catch (error) {
    console.error("Error logging logout:", error);
    return false;
  }
};

module.exports = {
  Logout,
  logLogout,
};
