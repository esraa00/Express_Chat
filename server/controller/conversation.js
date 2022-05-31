const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

const createConversation = async (req, res) => {
  const { senderId, recieverId } = req.body;
  const modifiedSenderId = mongoose.Types.ObjectId(senderId);
  const modifiedRecieverId = mongoose.Types.ObjectId(recieverId);
  const isFound = await Conversation.findOne({
    members: { $all: [modifiedSenderId, modifiedRecieverId] },
  });
  if (isFound) return res.status(400).send({ conversationDuplicated: true });
  const newConversation = new Conversation({
    members: [modifiedSenderId, modifiedRecieverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversation = async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversation = await Conversation.find({
      members: { $in: userId },
    });
    if (!conversation)
      return res.status(404).json({ conversationFound: false });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createConversation,
  getConversation,
};
