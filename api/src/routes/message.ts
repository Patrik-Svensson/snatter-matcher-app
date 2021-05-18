const express = require("express");
let router = express.Router();
const Message = require("../models/Message");

router.get("/", async function (req: any, res: any) {
  await Message.findMany({});
});

module.exports = { router };
