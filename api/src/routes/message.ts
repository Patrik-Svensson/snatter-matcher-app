import { nextTick } from "process";
import { IConversation } from "../models/Conversation";

const express = require("express");
const passport = require("passport");
let router = express.Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const conversationId = req.query.conversationId;
    const user = req.user;
    const conversation = await Conversation.findOne({ _id: conversationId });

    if (!conversation.members.includes(user._id)) {
      return next();
    }

    const messages = await Message.find({ conversation: conversationId });

    return res.json(messages);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const messageText = req.body.messageText;
    const conversationId = req.body.conversationId;
    const user = req.user;

    const conversation: IConversation = await Conversation.findOne({
      _id: conversationId,
    });

    console.log(conversation);
    if (!conversation.members.includes(user._id)) {
      return next();
    }

    const message = await Message.create({
      text: messageText,
      timestamp: Date.now(),
      conversation: conversationId,
    });

    return res.json(message);
  }
);

module.exports = { router };
