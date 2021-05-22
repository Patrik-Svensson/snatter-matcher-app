const express = require("express");
const passport = require("passport");
let router = express.Router();
const Message = require("../models/Message");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req: any, res: any) {
    //var hej = ExtractJwt.fromHeader("authorization");
    res.send("success");
  }
);

module.exports = { router };
