
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./db/connection")
const userRoute = require("./routes/users")
const imageRoute = require("./routes/imageRoute")
// database connection
const cors = require("cors");
dbConnect();


app.use(express.json());
app.use(cors());
app.use(userRoute)
app.use(imageRoute)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("app is listening on port: ", PORT)
})