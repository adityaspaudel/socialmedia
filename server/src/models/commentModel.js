const mongoose = require("mongoose");

const { Schema } = mongoose;

// ---------------- Comment Schema ----------------
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment, commentSchema };
