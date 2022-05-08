const router = require("express").Router();
const { registerUser, loginUser, refreshToken } = require("../controller/user");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshToken);

module.exports = router;
