const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  toggleLikeUnlike,
} = require("../controllers/postControllers");

router.post("/posts", createPost);
router.get("/posts", getPost);
router.put("/posts/:postId/like", toggleLikeUnlike);

module.exports=router
