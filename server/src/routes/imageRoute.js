const express = require("express");
const router = express.Router();

const {
  upload,
  uploadImage,
  getProfilePhotos,
} = require("../controllers/imageController"); // Controller

// Route for uploading an image
router.post("/upload", upload.single("photo"), uploadImage);
router.get("/api/:userId/getProfilePhotos", getProfilePhotos);

module.exports = router;
