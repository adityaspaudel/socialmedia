const mongoose = require("mongoose");

// ------------------ Database ------------------
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/socialmedia"
    );
    if (!isConnected) {
      console.error(`could not connect to mongodb`);
    } else {
      console.log("connected to mongodb");
    }
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
  }
};

module.exports = dbConnect;
