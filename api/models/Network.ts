export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

const Network = mongoose.model("Network", networkSchema);
module.exports = Network;
