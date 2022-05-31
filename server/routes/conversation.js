const router = require("express").Router();
const {
  createConversation,
  getConversation,
} = require("../controller/conversation");

router.route("/").post(createConversation);
router.route("/:userId").get(getConversation);

module.exports = router;
