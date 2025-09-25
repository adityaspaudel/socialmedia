const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");

// Login controller-------------------------

const loginUser = async (req, res) => {
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

module.exports = { loginUser };
