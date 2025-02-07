// Models
const mongoose = require("mongoose");

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

module.exports = User;
