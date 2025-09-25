const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URL = process.env.MONGODB_URL;
const DATABASE = process.env.DATABASE;

// Database connection
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(`${MONGODB_URL}/${DATABASE}`);
    if (isConnected) console.log(` Connected to mongodb, ${MONGODB_URL}/${DATABASE}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = dbConnect;
