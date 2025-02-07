const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // Middleware for handling file uploads
const { uploadImage } = require("../controllers/postImageController"); // Controller

// Route for uploading an image
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
