const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGODB_URI=process.env.MONGODB_URI

// Database connection
const dbConnect = async () => {
	try {
		const isConnected = await mongoose.connect(
			"mongodb://127.0.0.1:27017/socialmedia"
		);
		if (isConnected) console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
};

module.exports = dbConnect;
