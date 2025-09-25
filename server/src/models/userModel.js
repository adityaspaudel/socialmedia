const mongoose=require('mongoose')

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		phoneNumber: { type: String },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		isVerified: { type: Boolean, default: false },

		// Relationships
		followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // users who follow this user
		following: [{ type: Schema.Types.ObjectId, ref: "User" }], // users this user follows
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports=User
