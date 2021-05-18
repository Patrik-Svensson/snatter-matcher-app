export {};
const express = require("express");
const { update } = require("../models/User");
const User = require("../models/User");

let router = express.Router();

router.get("/", async function (req: any, res: any) {
  const username: string = req.query.username;
  const user = await User.findOne({ username: username });

  res.json(user);
});

router.post("/", async function (req: any, res: any) {
  const id = req.body._id;
  const age: number = req.body.age;

  delete req.body.username;

  const update = req.body;
  await User.updateOne({ _id: id }, update);

  return res.json(update);
});

module.exports = { router };
