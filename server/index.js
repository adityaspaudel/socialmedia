const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/page2", (req, res) => {
	res.send("Hello Asia");
});
app.get("/page3", (req, res) => {
	res.send("Hello Europe");
});
app.get("/page4", (req, res) => {
	res.send("Hello America");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
