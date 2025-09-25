const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Login controller-------------------------
// user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).send({ msg: "Invalid email or password!" });

    // Compare passwords
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(401).send({ msg: "Invalid email or password!" });

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with token and user info
    res.send({
      token,
      user,
      isLoggedIn: true,
      msg: "Login successful!",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ msg: "An error occurred. Please try again later." });
  }
};
// user registration
const userRegistration = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (await User.exists({ email }))
      return res.status(409).json({ msg: "Email already exists!" });

    const hashedPassword = await hashPassword(password);
    await User.create({ fullName, email, password: hashedPassword });
    res.status(201).json({ msg: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
//user search
const userSearch = async (req, res) => {
  const { query, currentUserId } = req.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const users = await User.find({ fullName: new RegExp(query, "i") }).select(
      "_id fullName"
    );
    if (!users.length) return res.status(404).json({ message: "Not found" });

    const currentUser = await User.findById(currentUserId).select("following");
    const followingSet = new Set(
      currentUser?.following.map((id) => id.toString()) || []
    );

    const response = users.map((u) => ({
      _id: u._id,
      fullName: u.fullName,
      isFollowing: followingSet.has(u._id.toString()),
    }));
    res.json({ users: response });
  } catch (err) {
    res.status(500).json({ message: "Error searching user" });
  }
};

const toggleFollowUnfollow = async (req, res) => {
  const { currentUserId } = req.params;
  const { followingTo } = req.body;
  if (currentUserId === followingTo)
    return res.status(400).json({ message: "Can't follow yourself" });

  try {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(followingTo);
    if (!currentUser || !targetUser)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(followingTo);
    if (isFollowing) {
      currentUser.following.pull(followingTo);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(followingTo);
      targetUser.followers.push(currentUserId);
    }
    await currentUser.save();
    await targetUser.save();

    res.json({ message: isFollowing ? "Unfollowed" : "Followed" });
  } catch (err) {
    res.status(500).json({ message: "Error toggling follow" });
  }
};

module.exports = {
  userLogin,
  userRegistration,
  userSearch,
  toggleFollowUnfollow,
};
