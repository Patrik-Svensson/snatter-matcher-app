export {};
const express = require("express");
const passport = require("passport");
let router = express.Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const user = req.user;
    const conversations = await Conversation.find({
      members: user._id,
    }).populate("messages");

    return res.json(conversations);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const user = req.user;
    const addedMembers = req.body.addedMembers.map((user: any) => user._id);
    const members = addedMembers.push(user._id);

    const conversation = await Conversation.create({ members: members });

    return res.json({ conversation });
  }
);

module.exports = { router };
