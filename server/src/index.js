require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { Schema } = mongoose;

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

// ------------------ Models ------------------/
//  ---------------- User Schema ----------------
const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    address: { type: String, default: "" },
    hobbies: [{ type: String }],
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],
    work: [
      {
        company: String,
        position: String,
        from: String,
        to: String,
      },
    ],
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ---------------- Comment Schema ----------------
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

// ---------------- Post Schema ----------------
const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    comments: [commentSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

// Notification Schema
const notificationSchema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["follow", "like", "comment"], required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", default: null },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);

// image Schema
const imageSchema = new mongoose.Schema(
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

// ------------------Controllers and Routes ------------------
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

// get my profile

// ---------------- GET /users/:userId/profile ----------------

// Get user profile along with their posts

router.get("/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user and select all needed fields
    const user = await User.findById(userId).select(
      "fullName username email phoneNumber bio profilePic address hobbies education work followers following"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch user's posts
    const posts = await Post.find({ author: userId })
      .populate("author", "fullName")
      .populate("comments.user", "fullName")
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Update user profile
router.put("/users/:userId/profile", async (req, res) => {
  const { userId } = req.params;
  const {
    fullName,
    username,
    bio,
    profilePic,
    address,
    phoneNumber,
    hobbies,
    education,
    work,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Invalid user ID" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update fields that exist in the request
    if (fullName !== undefined) user.fullName = fullName;
    if (username !== undefined) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (address !== undefined) user.address = address;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    // Make sure these are arrays
    if (hobbies !== undefined && Array.isArray(hobbies)) user.hobbies = hobbies;
    if (education !== undefined && Array.isArray(education))
      user.education = education;
    if (work !== undefined && Array.isArray(work)) user.work = work;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);

    // Check for duplicate key error (username/email)
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${key} already exists` });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Search  users
router.get("/search", async (req, res) => {
  const { query, currentuserId } = req.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const users = await User.find({ fullName: new RegExp(query, "i") }).select(
      "_id fullName"
    );
    if (!users.length) return res.status(404).json({ message: "Not found" });

    const currentUser = await User.findById(currentuserId).select("following");
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

// ------------------ Toggle follow/unfollow with notification ------------------
router.put("/:currentuserId/toggleFollowUnfollow", async (req, res) => {
  const { currentuserId } = req.params;
  const { followingTo } = req.body;
  if (currentuserId === followingTo)
    return res.status(400).json({ message: "Can't follow yourself" });

  try {
    const currentUser = await User.findById(currentuserId);
    const targetUser = await User.findById(followingTo);
    if (!currentUser || !targetUser)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(followingTo);
    if (isFollowing) {
      currentUser.following.pull(followingTo);
      targetUser.followers.pull(currentuserId);
    } else {
      currentUser.following.push(followingTo);
      targetUser.followers.push(currentuserId);

      // ✅ Create notification for follow
      await createNotification({
        recipient: followingTo,
        sender: currentuserId,
        type: "follow",
        message: "started following you",
      });
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
    const { description, userId } = req.body;
    if (!req.file || !description || !userId)
      return res.status(400).json({ message: "All fields required" });

    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    const newImage = await Image.create({
      description,
      imageUrl,
      user: userId,
    });
    res.json({ message: "Uploaded", imageUrl: newImage.imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Error uploading" });
  }
});

// Get profile photos
router.get("/:userId/photos", async (req, res) => {
  try {
    const images = await Image.find({ user: req.params.userId });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching photos" });
  }
});

// Posts
router.post("/posts", async (req, res) => {
  try {
    const { author, title, content } = req.body;
    if (!author || !content)
      return res.status(400).json({ message: "All fields required" });

    const post = await Post.create({ author, content });
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
// Add Comment Route
router.post("/posts/:id/comments", async (req, res) => {
  try {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();

    // ✅ Populate last comment
    const populatedComment = await Post.findById(req.params.id)
      .populate("comments.user", "fullName")
      .select("comments")
      .then((p) => p.comments[p.comments.length - 1]);

    // ✅ Create notification for comment (skip if user comments own post)
    if (post.author.toString() !== userId) {
      await createNotification({
        recipient: post.author,
        sender: userId,
        type: "comment",
        postId: post._id,
        message: "commented on your post",
      });
    }

    res
      .status(201)
      .json({ message: "Comment added", comment: populatedComment });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

// get specific post and populate comments
router.get("posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.user",
      "fullName email"
    ); // populate user info in comments

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
});

// Toggle like/unlike for a post
router.put("/posts/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.some((id) => id.toString() === userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);

      // ✅ Create notification for like (skip if user likes own post)
      if (post.author.toString() !== userId) {
        await createNotification({
          recipient: post.author,
          sender: userId,
          type: "like",
          postId: post._id,
          message: "liked your post",
        });
      }
    }

    await post.save();
    res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
      liked: !isLiked,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:userId/posts/:postId/getPostById", async (req, res) => {
  try {
    console.log("Params:", req.params); // ✅ Debug
    const { userId, postId } = req.params;

    const post = await Post.findById(postId)
      .populate("author", "fullName")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName" },
      });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get user by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .populate("author", "fullName email")
      .populate("comments")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
});

//  get all user's all posts
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// get specific user's all post
router.get("/users/post/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ author: userId })
      .populate("author", "fullName email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName email" },
      })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all registered users
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("userFetched successfully", users);
    res.status(200).json({ message: "userFetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// update a post
router.put("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.content = content || post.content;
    await post.save();

    // ✅ Optional notification if updater is not author
    if (userId && post.author.toString() !== userId) {
      await createNotification({
        recipient: post.author,
        sender: userId,
        type: "comment", // use existing enum to avoid schema issues
        postId: post._id,
        message: "updated your post",
      });
    }

    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a post
router.delete("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- Update Comment ----------------
router.put("/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId, text } = req.body;

    if (!text?.trim())
      return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res
        .status(403)
        .json({ message: "You can only edit your own comment" });

    comment.text = text;
    await post.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error editing comment" });
  }
});

// ---------------- Delete Comment ----------------
router.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req.body; // make sure body is used

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only author can delete
    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comment" });
    }

    // Remove comment safely
    post.comments.pull(commentId);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res
      .status(500)
      .json({ message: "Server error deleting comment", error: error.message });
  }
});

// Notification

// ✅ Notifications

// ✅ Create Notification Helper
const createNotification = async ({
  recipient,
  sender,
  type,
  postId,
  message,
}) => {
  try {
    if (recipient.toString() === sender.toString()) return;
    const newNotification = new Notification({
      recipient,
      sender,
      type,
      post: postId || null,
      message,
    });
    await newNotification.save();
  } catch (error) {
    console.error("❌ Error creating notification:", error.message);
  }
};

// get notifications
// ---------------- GET /users/:userId/notifications ----------------
router.get("/users/:userId/notifications", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "fullName email")
      .populate("post", "content")
      .sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});
// ---------------- PUT /users/:userId/notifications/:notificationId/read ----------------
router.put(
  "/users/:userId/notifications/:notificationId/read",
  async (req, res) => {
    try {
      const { notificationId } = req.params;

      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
      );

      if (!notification)
        return res.status(404).json({ message: "Notification not found" });

      res.json({ message: "Marked as read", notification });
    } catch (error) {
      console.error("Error updating notification:", error.message);
      res.status(500).json({ message: "Error updating notification" });
    }
  }
);
router.get("/test-notifications", async (req, res) => {
  const all = await Notification.find()
    .populate("sender", "fullName")
    .populate("recipient", "fullName");
  res.json(all);
});
router.get("/test", (req, res) => res.send("Server works"));
// ------------------ Mount router ------------------
app.use("/", router);

// ------------------ Start ------------------
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);
