const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./db/connection");

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const notificationRoute = require("./routes/notificationRoute");

// middleware
app.use(cors());
app.use(express.json());

// database Connection
dbConnect();

// routes
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(notificationRoute);

// application
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);
