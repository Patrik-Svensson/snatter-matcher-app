export {};
import { Schema, Document, Model, model, Types } from "mongoose";

export interface INetwork extends Document {
  name: string;
  users: Types.ObjectId[];
}

const networkSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: [Types.ObjectId],
    ref: "User",
  },
});

const Network: Model<INetwork> = model("Network", networkSchema);
module.exports = Network;
