const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URL = process.env.MONGODB_URL;

// Database connection
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(`${MONGODB_URL}/socialmedia`);
    if (isConnected) console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = dbConnect;
