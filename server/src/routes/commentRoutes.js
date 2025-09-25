const express = require("express");

const router = express.Router();

const { addComment, getComment } = require("../controllers/commentControllers");

router.post("posts/:id/comments", addComment);
router.get("posts/:postId/comments", getComment);
