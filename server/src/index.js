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
		description: { type: String, required: true },
		imageUrl: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // owner of post

		// ✅ New: Comments array
		comments: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

		// ✅ New: Likes as array of user references
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
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

// Search users by name, with follow state
app.get("/search", async (req, res) => {
  const { query, currentUserId } = req.query; // ✅ expecting both query + currentUserId

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // Find matching users
    const users = await User.find({
      fullName: new RegExp(query, "i"), // case-insensitive
    }).select("_id fullName");

    if (!users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get current user to check following state
    const currentUser = await User.findById(currentUserId).select("following");
    const followingSet = new Set(
      currentUser?.following.map((id) => id.toString()) || []
    );

    // Add `isFollowing` flag
    const response = users.map((u) => ({
      _id: u._id,
      fullName: u.fullName,
      isFollowing: followingSet.has(u._id.toString()),
    }));

    res.status(200).json({ message: "Users found", users: response });
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
		const { description, userid } = req.body; // Extract userid from request body

		if (!req.file || !description || !userid) {
			return res.status(400).json({ message: "All fields are required." });
		}

		const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

		const newImage = new Image({
			description,
			imageUrl,
			user: userid, // Associate image with user
		});

		await newImage.save();

		res.status(200).json({ message: "File uploaded successfully", imageUrl });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error uploading file" });
	}
});

// get profile images controller & route----
// Fetch all images

app.get("/api/:userid/getProfilePhotos", async (req, res) => {
	try {
		const { userid } = req.params; // Get the dynamic user ID from the URL
		const images = await Image.find({ user: userid }); // Fetch images from the database where user matches the provided user ID
		res.status(200).json(images); // Return the images
	} catch (error) {
		console.error("Error fetching images:", error);
		res.status(500).json({ message: "Error fetching images" });
	}
});

// get individual images from imageid

app.get("/api/images/:imageid", async (req, res) => {
	try {
		const image = await Image.findById(req.params.imageid);
		if (!image) return res.status(404).json({ message: "Image not found" });

		res.status(200).json(image); // Serve it directly all image information
	} catch (err) {
		res.status(500).json({ message: "Server error" });
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

// 🔁 Toggle follow/unfollow
app.put("/:currentUserId/toggleFollowUnfollow", async (req, res) => {
	const { currentUserId } = req.params;
	const { followingTo } = req.body;

	// 🛑 Prevent following yourself
	if (currentUserId === followingTo) {
		return res.status(400).json({ message: "You can't follow yourself." });
	}

	try {
		const currentUser = await User.findById(currentUserId);
		const targetUser = await User.findById(followingTo);

		// 🛑 Check if both users exist
		if (!currentUser || !targetUser) {
			return res.status(404).json({ message: "User not found." });
		}

		// ✅ Check if already following
		const isFollowing = currentUser.following.some(
			(id) => id.toString() === followingTo
		);

		if (isFollowing) {
			// 🔁 Unfollow
			currentUser.following = currentUser.following.filter(
				(id) => id.toString() !== followingTo
			);
			targetUser.followers = targetUser.followers.filter(
				(id) => id.toString() !== currentUserId
			);
		} else {
			// ➕ Follow
			currentUser.following.push(followingTo);
			targetUser.followers.push(currentUserId);
		}

		// 💾 Save both users
		await currentUser.save();
		await targetUser.save();

		// ✅ Send response
		res.status(200).json({
			message: isFollowing
				? "Unfollowed successfully."
				: "Followed successfully.",
			following: !isFollowing,
		});
	} catch (error) {
		console.error("Error in follow/unfollow:", error);
		res.status(500).json({ message: "Something went wrong." });
	}
});
// Start server-------------------------------------
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
