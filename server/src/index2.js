const express = require("express");

const app = express();
const cors = require("cors");
const dbConnect = require("./db/connection");

const dotenv = require("dotenv");
dotenv.config();
// middleware
app.use(cors());
app.use(express.json());

// database connection
dbConnect();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
