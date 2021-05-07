const mongoose = require("mongoose");
const Schema = mongoose.Schema;

convesationSchema = new Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
  },
});
