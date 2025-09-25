const express = require("express");
const router = express.Router();
const {
  userLogin,
  userRegistration,
  userSearch,
  toggleFollowUnfollow,
} = require("../controllers/userControllers");


router.post("/login", userLogin);
router.post("/register", userRegistration);
router.post("/search", userSearch);
router.post("/:currentUserId/toggleFollowUnfollow", toggleFollowUnfollow);

module.exports = router;
 