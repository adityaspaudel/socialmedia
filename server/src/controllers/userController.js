const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/userModel");
const { createNotification } = require("./notificationController");
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");

// ------------------ Helpers ------------------
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const hashPassword = async (password) =>
  await bcrypt.hash(password, saltRounds);
const secretKey = process.env.SECRET_KEY;

// User Registration controller

const userRegistration = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (await User.exists({ email }))
      return res.status(409).json({ msg: "Email already exists!" });

    const hashedPassword = await hashPassword(password);
    await User.create({ fullName, email, password: hashedPassword });
    res.status(201).json({ msg: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// userLogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "7d" });
    res.json({ msg: "Login successful", token, user: { id: user._id, email } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user profile along with their posts
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user and select all needed fields
    const user = await User.findById(userId).select(
      "fullName username email phoneNumber bio profilePic address hobbies education work followers following"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch user's posts
    const posts = await Post.find({ author: userId })
      .populate("author", "fullName")
      .populate("comments.user", "fullName")
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile controller
const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    fullName,
    username,
    bio,
    profilePic,
    address,
    phoneNumber,
    hobbies,
    education,
    work,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Invalid user ID" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update fields that exist in the request
    if (fullName !== undefined) user.fullName = fullName;
    if (username !== undefined) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (address !== undefined) user.address = address;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    // Make sure these are arrays
    if (hobbies !== undefined && Array.isArray(hobbies)) user.hobbies = hobbies;
    if (education !== undefined && Array.isArray(education))
      user.education = education;
    if (work !== undefined && Array.isArray(work)) user.work = work;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);

    // Check for duplicate key error (username/email)
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${key} already exists` });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// searchUser controller
const searchUsers = async (req, res) => {
  const { query, currentuserId } = req.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const users = await User.find({ fullName: new RegExp(query, "i") }).select(
      "_id fullName"
    );
    if (!users.length) return res.status(404).json({ message: "Not found" });

    const currentUser = await User.findById(currentuserId).select("following");
    const followingSet = new Set(
      currentUser?.following.map((id) => id.toString()) || []
    );

    const response = users.map((u) => ({
      _id: u._id,
      fullName: u.fullName,
      isFollowing: followingSet.has(u._id.toString()),
    }));
    res.json({ users: response });
  } catch (err) {
    res.status(500).json({ message: "Error searching user" });
  }
};

// ------------------ Toggle follow/unfollow with notification ------------------

// toggleFollowUnfollow controller

const toggleFollowUnfollow = async (req, res) => {
  const { currentuserId } = req.params;
  const { followingTo } = req.body;
  if (currentuserId === followingTo)
    return res.status(400).json({ message: "Can't follow yourself" });

  try {
    const currentUser = await User.findById(currentuserId);
    const targetUser = await User.findById(followingTo);
    if (!currentUser || !targetUser)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(followingTo);
    if (isFollowing) {
      currentUser.following.pull(followingTo);
      targetUser.followers.pull(currentuserId);
    } else {
      currentUser.following.push(followingTo);
      targetUser.followers.push(currentuserId);

      // ✅ Create notification for follow
      await createNotification({
        recipient: followingTo,
        sender: currentuserId,
        type: "follow",
        message: "started following you",
      });
    }
    await currentUser.save();
    await targetUser.save();

    res.json({ message: isFollowing ? "Unfollowed" : "Followed" });
  } catch (err) {
    res.status(500).json({ message: "Error toggling follow" });
  }
};
// get user by userId controller
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .populate("author", "fullName email")
      .populate("comments")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

// get all registered users controller
const getAllRegisteredUser = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("userFetched successfully", users);
    res.status(200).json({ message: "userFetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  getUserProfile,
  updateUserProfile,
  searchUsers,
  toggleFollowUnfollow,
  getUserById,
  getAllRegisteredUser,
};
