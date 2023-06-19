const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/user").get(getUsers).post(createUser);
router.route("/user/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
