const {
  fetchUser,
  fetchUserByName,
  logoutUser,
  modifyUser,
} = require("../controller/user");
const router = require("express").Router();

// router.route("/modify").post(modifyUser);
router.route("/logout").get(logoutUser);
router.route("/:id").get(fetchUser);
router.route("/byname/:username").get(fetchUserByName);

module.exports = router;
