const router = require("express").Router();
const {
  registerUser,
  loginUser,
  refreshToken,
  isLoggedIn,
} = require("../controller/authUser");
router.route("/isLoggedIn").get(isLoggedIn);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshToken);

module.exports = router;
