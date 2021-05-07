const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "ready"],
    default: "pending",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  offers: {
    type: [String],
    enum: ["coaching", "mentorship", "networking"],
  },
  lookingFor: {
    type: [String],
    enum: ["coaching", "mentorship", "networking"],
  },
  jobs: {
    type: [String],
  },
  educations: {
    type: [String],
  },
  networks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Network",
  },
  recommendations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  conversations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Conversation",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
