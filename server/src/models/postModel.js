const mongoose = require("mongoose");

const { Schema } = mongoose;
const {commentSchema}=require("./commentModel")
// ---------------- Post Schema ----------------
const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    comments: [commentSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
