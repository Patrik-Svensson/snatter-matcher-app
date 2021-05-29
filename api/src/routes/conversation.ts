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
    /*const conversations = [
      {
        id: 1,
        name: "Patrik Svensson",
        lastMessage: "hej",
        image: "/stock-profile.jpeg",
      },
      {
        id: 2,
        name: "Sebastian Nylén",
        lastMessage: "Errrrru go eller?",
        image: "/stock-profile.jpeg",
      },
    ];*/

    const user = req.user;
    const conversations = await Conversation.find({ members: user._id });

    //const conversations: any = await Conversation.findOne({});

    res.json(conversations);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const user = req.user;
    const addedMembers = req.body.addedMembers.map((user: any) => user._id);
    const members = addedMembers.push(user._id);
    console.log(members);
    //const conversation = await Conversation.create({ members: members });

    res.json({});
  }
);

module.exports = { router };
