const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: Array,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
