const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/register", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection of NODE.JS with MONGODB Successful");
  })
  .catch((err) => {
    console.log(err);
  });
