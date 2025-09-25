const mongoose = require("mongoose");

// ---------------- Post Schema ----------------
const postSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },

    // Comments
    comments: [commentSchema],

    // Likes (users who liked this post)
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
