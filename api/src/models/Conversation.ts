export {};
import { Schema, Document, Model, model, Types } from "mongoose";

export interface IConversation extends Document {
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const conversationSchema = new Schema({
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  messages: {
    type: [Schema.Types.ObjectId],
    ref: "Message",
  },
});

const Conversation: Model<IConversation> = model(
  "Conversation",
  conversationSchema
);
module.exports = Conversation;
