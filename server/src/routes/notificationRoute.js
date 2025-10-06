const express = require("express");

const router = express.Router();

const {
  getNotifications,
  readUnreadNotifications,
} = require("../controllers/notificationController");

// getNotifications route
router.get("/users/:userId/notifications", getNotifications);

// readUnreadNotifications route
router.put(
  "/users/:userId/notifications/:notificationId/read",
  readUnreadNotifications
);

module.exports = router;
