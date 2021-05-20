const express = require("express");
const passport = require("passport");
let router = express.Router();
const Message = require("../models/Message");

router.get(
  "/",
  passport.authenticate("local"),
  async function (req: any, res: any) {
    await Message.findMany({});
  }
);

module.exports = { router };
