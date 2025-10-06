const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const express = require("express");
const router = express.Router();

// Add Comment Route
router.post("/posts/:id/comments", addComment);

// updateAComment route
router.put("/posts/:postId/comments/:commentId", updateComment);

// deleteAComment Route
router.delete("/posts/:postId/comments/:commentId", deleteComment);

module.exports = router;
