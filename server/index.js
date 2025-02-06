require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 8000;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

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
dbConnect();

// Models
const { Schema } = mongoose;
const userSchema = new Schema(
	{
		email: { type: String, unique: true, required: true },
		phoneNumber: { type: Number },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		isVerified: { type: Boolean, default: false },
		fullName: { type: String, required: true },
	},
	{ timestamps: true }
);
const User = mongoose.model("User", userSchema);

// Email transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to hash passwords
const hashPassword = async (password) => {
	return await bcrypt.hash(password, saltRounds);
};

// Routes
// Register
app.post("/register", async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		// Check if email exists
		const emailExist = await User.exists({ email });
		if (emailExist)
			return res.status(409).send({ msg: "Email already exists!" });

		// Hash password
		const hashedPassword = await hashPassword(password);

		// Save user to database
		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword,
		});

		// Send welcome email
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Welcome to Our Service",
			text: `Hello ${fullName},\n\nThank you for registering! We're excited to have you on board.\n\nBest regards,\nNepConnect`,
		};

		await transporter.sendMail(mailOptions);

		// Respond to frontend
		res.status(201).send({ msg: "Registration successful, email sent!" });
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).send({ msg: "An error occurred. Please try again later." });
	}
});

// Login
app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if email exists
		const user = await User.findOne({ email });
		if (!user)
			return res.status(401).send({ msg: "Invalid email or password!" });

		// Compare passwords
		const isPasswordMatched = await bcrypt.compare(password, user.password);
		if (!isPasswordMatched)
			return res.status(401).send({ msg: "Invalid email or password!" });

		// Generate JWT token
		const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});

		// Respond with token and user info
		res.send({
			token,
			user,
			isLoggedIn: true,
			msg: "Login successful!",
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).send({ msg: "An error occurred. Please try again later." });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
