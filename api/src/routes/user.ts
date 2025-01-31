export {};
const express = require("express");
const { update } = require("../models/User");
const User = require("../models/User");
const passport = require("passport");

let router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    User.find({}, function (err: any, users: any) {
      if (err) {
        next();
      }
      console.log(users);
      console.log("hej");
      res.json(users);
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req: any, res: any, next: any) {
    const id = req.body._id;
    const age: number = req.body.age;

    delete req.body.username;

    const update = req.body;
    User.updateOne({ _id: id }, update, function (err: any, user: any) {
      if (err) {
        next();
      }
    });

    return res.json(update);
  }
);

module.exports = { router };
