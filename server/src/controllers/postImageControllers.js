const Image = require("../models/postImage"); // Import your Mongoose model

// Controller for uploading an image
const uploadImage = async (req, res) => {
	try {
		const { description } = req.body;
		const imageUrl = `http://localhost:9000/uploads/${req.file.filename}`;

		const newImage = new Image({ description, imageUrl });
		await newImage.save();

		res.status(200).json({ message: "File uploaded successfully", imageUrl });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error uploading file" });
	}
};

module.exports = {
	uploadImage,
};
