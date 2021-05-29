import { IUser } from "../models/User";
require("dotenv").config();
const User = require("../models/User");
const { body, validationResult, check } = require("express-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
let router = express.Router();
const passport = require("passport");
const fs = require("fs");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const DEV_MODE = true;

const PRIVATE_KEY = DEV_MODE
  ? "private_key_dummy"
  : fs.readFileSync("private.key");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIVATE_KEY,
};

passport.use(
  new JwtStrategy(opts, (token: any, done: any) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new JwtStrategy(opts, function (jwt_payload: any, done: any) {
    User.findOne({ id: jwt_payload.sub }, function (err: any, user: any) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

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
  async function (req: any, res: any, next: any) {
    const user: any = await User.findOne({ username: req.body.username });

    const body = { _id: user._id, username: user.username };
    console.log(body);
    const token = jwt.sign({ user: body }, PRIVATE_KEY);
    return res.json({ token });
  }
);

router.post(
  "/signup",
  body("username").isEmail(),
  body("password").isStrongPassword(),
  async function (req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next();
    }

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
