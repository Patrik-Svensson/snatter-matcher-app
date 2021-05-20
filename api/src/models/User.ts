export {};
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import { Schema, Document, Model, model, Types } from "mongoose";

enum UserStatus {
  Pending = "pending",
  Ready = "ready",
}

enum UserGender {
  Male = "male",
  Female = "female",
}

enum UserOffering {
  Coaching = "coaching",
  Mentorship = "mentoship",
  Networking = "networking",
}

export interface IUser extends Document {
  username: string;
  password: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  age: number;
  gender: UserGender;
  offers: UserOffering;
  jobs: string[];
  educations: string[];
  networks: Types.ObjectId[];
  recommendations: Types.ObjectId[];
  conversations: Types.ObjectId[];
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
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
    type: [Types.ObjectId],
    ref: "Network",
  },
  recommendations: {
    type: [Types.ObjectId],
    ref: "User",
  },
  conversations: {
    type: [Types.ObjectId],
    ref: "Conversation",
  },
});

userSchema.pre<IUser>("save", async function (next: any) {
  const hash: any = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, this.password);
    console.log(compare);
    return compare;
  }
);

const User: Model<IUser> = model("User", userSchema);
module.exports = User;
