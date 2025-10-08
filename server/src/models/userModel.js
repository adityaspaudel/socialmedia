const mongoose = require("mongoose");

const { Schema } = mongoose;

//  ---------------- User Schema ----------------
const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    address: { type: String, default: "" },
    hobbies: [{ type: String }],
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],
    work: [
      {
        company: String,
        position: String,
        from: String,
        to: String,
      },
    ],
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
