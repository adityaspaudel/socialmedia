const mongoose = require("mongoose");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const createPost = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    if (!author || !content)
      return res.status(400).json({ message: "All fields required" });

    const post = await Post.create({ author, content });
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "fullName email")
      .populate("comments.user", "fullName email")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    console.log("Params:", req.params); // ✅ Debug
    const { userId, postId } = req.params;

    const post = await Post.findById(postId)
      .populate("author", "fullName")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName" },
      });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleLikeUnlike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user already liked
    const isLiked = post.likes.some((id) => id.toString() === userId);

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
      liked: !isLiked,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPost, getPost, toggleLikeUnlike, getPostById };
