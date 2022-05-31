const mongoose = require("mongoose");
const Message = require("../models/message");

const addMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    const modifiedConversationId = mongoose.Types.ObjectId(conversationId);
    const modifiedSenderId = mongoose.Types.ObjectId(senderId);
    const createdMessage = await Message.create({
      conversationId: modifiedConversationId,
      senderId: modifiedSenderId,
      text,
    });
    res.status(200).send(createdMessage);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getMessage = async (req, res) => {
  const conversationId = req.params.conversationId;
  try {
    const messages = await Message.find({
      conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const modifyMessage = async (req, res) => {
  const { _id, text } = req.body;
  try {
    const message = await Message.findById(_id);
    if (message.text === text) {
      return res.status(200).send("no change happened in the text");
    }
    const modifiedMessage = await Message.findByIdAndUpdate(
      _id,
      { text },
      { new: true }
    );
    res.status(200).send(modifiedMessage);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addMessage, getMessage, modifyMessage };
