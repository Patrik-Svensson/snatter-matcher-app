import { IUser } from "../models/User";

export {};
require("dotenv").config();
const User = require("../models/User");
const { body, validationResult, check } = require("express-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
let router = express.Router();

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username: string, password: string, done: any) => {
      try {
        const user = await User.create({ username, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username: string, password: string, done: any) => {
      try {
        const user: IUser = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

router.post(
  "/signup",
  body("username").isEmail(),
  body("password").isStrongPassword(),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  (req: any, res: any, next: any) => {
    try {
      passport.authenticate("signup", { session: false });
    } catch (err) {
      console.log(err);
    }
  },
  async (req: any, res: any, next: any) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req: any, res: any, next: any) => {
  passport.authenticate("login", async (err: any, user: any, info: any) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error: any) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.username };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = { router };
