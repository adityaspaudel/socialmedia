const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  toggleLikeUnlike,
  getPostById,
} = require("../controllers/postControllers");

router.post("/posts", createPost);
router.get("/posts", getPost);
router.put("/posts/:postId/like", toggleLikeUnlike);
router.get("/:userId/posts/:postId/getPostById", getPostById);

module.exports = router;
