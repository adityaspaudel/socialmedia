const express = require("express");
const router = express.Router();

const {
  userRegistration,
  userLogin,
  getUserProfile,
  updateUserProfile,
  searchUsers,
  toggleFollowUnfollow,
  getUserById,
  getAllRegisteredUser,
} = require("../controllers/userController");

// userRegistration route
router.post("/register", userRegistration);

// userLogin route
router.post("/login", userLogin);

// get user profile route
router.get("/users/:userId/profile", getUserProfile);

// update user profile route
router.put("/users/:userId/profile", updateUserProfile);

// Search  users route
router.get("/search", searchUsers);

// toggleFollowUnfollow route
router.put("/:currentuserId/toggleFollowUnfollow", toggleFollowUnfollow);

// getUserById route
router.get("/user/:userId", getUserById);

// getAllRegisteredUser route
router.get("/getAllUsers", getAllRegisteredUser);

module.exports = router;
