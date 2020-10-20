const express = require("express");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");

// @Route               GET /api/messages/conversation/query?to={userId}
// @Description         Get messages from two recipients
router.get("/conversation/query", auth, async (req, res) => {
  // Load messages based on the conversation id to ensure we don't load all
  // messages in the DB
  try {
    const user1 = mongoose.Types.ObjectId(req.user.id);
    const user2 = mongoose.Types.ObjectId(req.query.to);

    const messages = await Message.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "toTable"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "fromTable"
        }
      }
    ]).match({
      $or: [
        {$and: [{to: user1}, {from: user2}]},
        {$and: [{to: user2}, {from: user1}]}
      ]
    }).project({
      "toTable": 0,
      "fromTable": 0
    });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// @Route               GET /api/messages/conversation?to={userId}
// @Description         Get user conversations list
router.get("/conversation", auth, async (req, res) => {
  try {
    // Join conversation table with the users table
    // Local field is recipient - the input document
    // Foreign field is user id (_id) - the from collection
    // Output as a recipients table with "to" data.
    // $elemMatch matches documents that contain an array field with at
    // least one element that matches all the specified query
    const to = mongoose.Types.ObjectId(req.query.to);
    const from = mongoose.Types.ObjectId(req.user.id);

    const conversations = await Conversation.find({participants: {
      $all: [{$elemMatch: {$eq: from}}, {$elemMatch: {$eq: to}}]
    }}).populate("participants", "username");

    return res.json(conversations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// @Route               GET /api/messages/conversations
// @Description         Get user conversations list
router.get("/conversations", auth, async (req, res) => {
  try {
    // Join conversation table with the users table
    // Local field is recipient - the input document
    // Foreign field is user id (_id) - the from collection
    // Output as a recipients table with "to" data.
    // $elemMatch matches documents that contain an array field with at
    // least one element that matches all the specified query
    const from = mongoose.Types.ObjectId(req.user.id);
    const conversations = await Conversation.find({participants: {
      $all: [{$elemMatch: {$eq: from}}]
    }}).populate("participants", "username");

    const recipient = conversations.map(conversation => {
      return {
        participant: conversation.participants.filter(participant => participant.id.toString() !== req.user.id)[0],
        last_message: conversation.last_message
      }
    })

    return res.json(recipient);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// @Route               POST /api/messages?to={userId}
// @Description         Post a message in the chat
router.post("/message", auth, async (req, res) => {
  // Each conversation represents a chat room
  // We check if a conversation exists. If it doesn't we create one.
  // We then take the conversation id and store it in the message document
  // along with the message body of the conversation
  try {
    const to = req.query.to;
    const from = req.user.id;

    const { message } = req.body;

    // Find conversation and check if it exists. Create one if it doesn't
    let conversation = await Conversation.findOne({
      participants: {
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(to) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(from) } },
        ],
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [],
        last_message: message
      });

      conversation.participants.push(mongoose.Types.ObjectId(to));
      conversation.participants.push(mongoose.Types.ObjectId(from));

      await conversation.save();
    }else{
      conversation.last_message = message;
      await conversation.save();
    }

    // Create and publish message
    const newMessage = new Message({
      conversation: conversation.id,
      from: from,
      to: to,
      message: message,
    });

    // Emit message
    // On the client side, we listen to the message id
    // and update the state every time we post a new message
    req.io.sockets.emit("message", message);

    await newMessage.save();

    return res.json(newMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
