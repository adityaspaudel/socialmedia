const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const addComment = async (req, res) => {
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

const getComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.user",
      "fullName email"
    ); // populate user info in comments

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};
module.exports = { addComment, getComment };
