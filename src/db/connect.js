const mongoose = require("mongoose");

// Connect to MongoDB with better error handling
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
    console.error("MongoDB connection error:", err);
    console.error("Please make sure MongoDB is running on your system");
    console.error("You can start MongoDB by running 'mongod' in a terminal");
  });

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});
