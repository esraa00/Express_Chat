const router = require("express").Router();
const {
  addMessage,
  getMessage,
  modifyMessage,
} = require("../controller/message");

router.route("/add").post(addMessage);
router.route("/:conversationId").get(getMessage);
router.route("/modify").post(modifyMessage);

module.exports = router;
