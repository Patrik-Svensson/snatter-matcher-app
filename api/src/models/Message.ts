export {};
import { Schema, Document, Model, model, Types } from "mongoose";

export interface IMessage extends Document {
  text: string;
  timestamp: Date;
  conversation: Types.ObjectId;
}

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  conversation: {
    type: Types.ObjectId,
    required: true,
  },
});

const Message: Model<IMessage> = model("Message", messageSchema);
module.exports = Message;
