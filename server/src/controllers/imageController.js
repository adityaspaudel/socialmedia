const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const Image = require("../models/postImage"); // Import your Mongoose model
const path = require("path");
const fs = require("fs"); // Import the 'fs' module for directory creation

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// Controller for uploading an image

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
const uploadImage = (upload.single("image"), async (req, res) => {
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
// /api/: userid / getProfilePhotos
const getProfilePhotos = async (req, res) => {
	try {
		const { userid } = req.params; // Get the dynamic user ID from the URL
		const images = await Image.find({ user: userid }); // Fetch images from the database where user matches the provided user ID
		res.status(200).json(images); // Return the images
	} catch (error) {
		console.error("Error fetching images:", error);
		res.status(500).json({ message: "Error fetching images" });
	}
};


module.exports = {
	upload,uploadImage, getProfilePhotos
};
