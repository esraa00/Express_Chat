const router = require("express").Router();
const { createConversation } = require("../controller/conversation");
router.route("/").post(createConversation);

module.exports = router;
