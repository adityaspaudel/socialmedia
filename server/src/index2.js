const express = require("express");

const app = express();
const cors = require("cors");
const dbConnect = require("./db/connection");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");

// middleware
app.use(cors());
app.use(express.json());

// database connection
dbConnect();
app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app is running on http://127.0.0.1:${PORT}`);
});
