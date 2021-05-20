import { IUser } from "../models/User";
require("dotenv").config();
const User = require("../models/User");
const { body, validationResult, check } = require("express-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
let router = express.Router();
const passport = require("passport");
const fs = require("fs");
const LocalStrategy = require("passport-local").Strategy;

const DEV_MODE = true;

const PRIVATE_KEY = DEV_MODE
  ? "private_key_dummy"
  : fs.readFileSync("private.key");

passport.use(
  new LocalStrategy(function (username: string, password: string, done: any) {
    User.findOne(
      { username: username },
      async function (err: any, user: IUser) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      }
    );
  })
);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  function (req: any, res: any, next: any) {
    const token = jwt.sign({ user: body }, PRIVATE_KEY);
    return res.json({ token });
  }
);

router.post(
  "/signup",
  body("username").isEmail(),
  body("password").isStrongPassword(),
  async function (req: any, res: any, next: any) {
    try {
      await User.create({
        username: req.body.username,
        password: req.body.password,
      });
    } catch {
      return next();
    }

    res.redirect(307, "/auth/login");
  }
);

module.exports = { router };
