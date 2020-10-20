const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
