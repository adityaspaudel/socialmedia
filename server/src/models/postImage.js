// Models
const mongoose = require("mongoose");

const { Schema } = mongoose;
const imageSchema = new Schema(
	{
		description: String,
		imageUrl: String,
	},
	{ timestamps: true }
);
const Image = mongoose.model("User", imageSchema);

module.exports = Image;
