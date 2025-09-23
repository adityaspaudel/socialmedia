require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// ------------------ Database ------------------
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialmedia");
    console.log("✅ Connected to MongoDB/socialmedia");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
  }
};
dbConnect();

// ------------------ Models ------------------
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: Number },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    fullName: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    content: { type: String, required: true, trim: true },
    comments: [commentSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

const imageSchema = new Schema(
  {
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Image = mongoose.model("Image", imageSchema);

// ------------------ Multer ------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ------------------ Helpers ------------------
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const hashPassword = async (password) =>
  await bcrypt.hash(password, saltRounds);
const secretKey = process.env.SECRET_KEY;

// ------------------ Routes ------------------
// Register
router.post("/register", async (req, res) => {
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
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "7d" });
    res.json({ msg: "Login successful", token, user: { id: user._id, email } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Search users
router.get("/search", async (req, res) => {
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
});

// Toggle follow/unfollow
router.put("/:currentUserId/toggleFollowUnfollow", async (req, res) => {
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
});

// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description, userid } = req.body;
    if (!req.file || !description || !userid)
      return res.status(400).json({ message: "All fields required" });

    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    const newImage = await Image.create({
      description,
      imageUrl,
      user: userid,
    });
    res.json({ message: "Uploaded", imageUrl: newImage.imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Error uploading" });
  }
});

// Get profile photos
router.get("/:userid/photos", async (req, res) => {
  try {
    const images = await Image.find({ user: req.params.userid });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching photos" });
  }
});

// Posts
router.post("/posts", async (req, res) => {
  try {
    const { author, title, content } = req.body;
    if (!author || !title || !content)
      return res.status(400).json({ message: "All fields required" });

    const post = await Post.create({ author, title, content });
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "fullName email")
      .populate("comments.user", "fullName email")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Add comment (only if follower)
router.post("/posts/:postId/comments", async (req, res) => {
  try {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.postId).populate(
      "author",
      "followers"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isFollower = post.author.followers.some(
      (f) => f.toString() === userId
    );
    if (!isFollower)
      return res.status(403).json({ message: "Only followers can comment" });

    post.comments.push({ user: userId, text });
    await post.save();

    const updated = await Post.findById(post._id)
      .populate("author", "fullName")
      .populate("comments.user", "fullName");
    res.json({ message: "Comment added", post: updated });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

// ------------------ Mount router ------------------
app.use("/", router);

// ------------------ Start ------------------
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);


