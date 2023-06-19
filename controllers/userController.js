const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/dbModel");
const authenticateToken = require("../middleware/authToken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    // Auto incremented user ID
    const lastUser = await User.findOne({ order: [["USER_ID", "DESC"]] });
    const userId = lastUser ? lastUser.USER_ID + 1 : 1;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user record
    await User.create({
      USER_ID: userId,
      USERNAME: username,
      PASSWORD: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user and generate JWT
exports.loginUser = async (req, res) => {
  try {
    const { USERNAME, PASSWORD } = req.body;
    if (!USERNAME || !PASSWORD) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    // Check user
    const user = await User.findOne({ where: { USERNAME } });
    if (!user) {
      return res.status(401).json({ error: "Invalid USERNAME or PASSWORD" });
    }
    // Compare the provided pwd
    const isPASSWORDValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isPASSWORDValid) {
      return res.status(401).json({ error: "Invalid USERNAME or PASSWORD" });
    }
    // JWT token
    const token = jwt.sign({ userId: user.USER_ID }, process.env.SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Unable to login user" });
  }
};

// Get current user - protected
exports.getCurrentUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["PASSWORD"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting current user profile:", error);
    res.status(500).json({ error: "Unable to retrieve user profile" });
  }
};

//delete user
exports.userDelete = async (req, res) => {
  try {
    const USER_ID = req.params.USER_ID;
    // Find the user by ID
    const user = await User.findByPk(USER_ID);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the user
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
