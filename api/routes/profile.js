const express = require("express");
const { update } = require("../models/User");
const User = require("../models/User");

let router = express.Router();

router.get("/", async function (req, res) {
  const username = req.query.username;
  const user = await User.findOne({ username: username });

  res.json(user);
});

router.post("/", async function (req, res) {
  const id = req.body._id;
  const age = req.body.age;

  delete req.body.username;

  const update = req.body;

  await User.updateOne({ _id: id }, update);

  return res.send("hej");
});

module.exports = { router };
