const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUserProfile,
  userDelete,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authToken");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authenticateToken, getCurrentUserProfile);
router.route("/user/:USER_ID").delete(userDelete);

module.exports = router;
