export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
