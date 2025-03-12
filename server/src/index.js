require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

// const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs"); // Import the 'fs' module for directory creation

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection-----------------------------
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/socialmedia"
    );
    if (isConnected) console.log("Connected to MongoDB/socialmedia");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};
dbConnect();

// Models-----------------------------------------------------
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: Number },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    fullName: { type: String, required: true },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who follow this user
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users this user is following
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// photo upload schema---------

const imageSchema = new Schema(
  {
    description: String,
    imageUrl: String,
  },
  { timestamps: true }
);
const Image = mongoose.model("Image", imageSchema);

// module.exports = Image;

// Email transporter
// const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: process.env.EMAIL_USER,
// 		pass: process.env.EMAIL_PASS,
// 	},
// });

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to hash passwords
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// Controllers & Routes -------------------------------------------------------------
// Register  routes-----------------------
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

    // Respond to frontend
    res.status(201).send({ msg: "Registration successful, email sent!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ msg: "An error occurred. Please try again later." });
  }
});

// Controller and Route combined: Search users by name----------------
app.get("/search", async (req, res) => {
  const { query } = req.query; // Now correctly using req.query for GET requests

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const users = await User.find({
      fullName: new RegExp(query, "i"), // case-insensitive search
    });

    if (users.length > 0) {
      res.status(200).json({ message: "Users found", users: users });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error searching user:", err);
    res.status(500).json({ message: "Error searching user" });
  }
});

//multer--------------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Multer setup
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the dynamically created directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes and Controllers
// Upload a new photo
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    const newImage = new Image({ description, imageUrl });
    await newImage.save();

    res.status(200).json({ message: "File uploaded successfully", imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
});
// get profile images controller & route----
// Fetch all images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
});

// Login routes-------------------------
const secretKey = process.env.SECRET_KEY;
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password!" });

    // Compare passwords
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(401).json({ msg: "Invalid email or password!" });

    // Generate JWT token (Include user ID for better identification)
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "7d",
    });

    // Respond with minimal user data
    // console.log("JWT Secret Key:", secretKey);

    res.json({
      msg: "Login successful!",
      isLoggedIn: true,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "An error occurred. Please try again later." });
  }
});

// Start server-------------------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
