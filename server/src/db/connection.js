const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// ------------------ Database ------------------
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGODB_ATLAS_URI);
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
