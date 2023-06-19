const User = require("../models/dbModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { user_id, fName, lName } = req.body;
    const newUser = await User.create({ user_id, fName, lName });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Unable to create user" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Unable to retrieve users" });
  }
};

// Get a single user by userId
exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Unable to retrieve user" });
  }
};

// Update a user by userId
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { fName, lName } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.fName = fName;
      user.lName = lName;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Unable to update user" });
  }
};

// Delete a user by userId
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Unable to delete user" });
  }
};
