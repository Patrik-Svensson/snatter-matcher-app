"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const User = require("../models/User");
const { body, validationResult, check } = require("express-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
let router = express.Router();
const passport = require("passport");
const fs = require("fs");
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const DEV_MODE = true;
const PRIVATE_KEY = DEV_MODE
    ? "private_key_dummy"
    : fs.readFileSync("private.key");
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATE_KEY,
};
passport.use(new JwtStrategy(opts, (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            const isValidPassword = yield user.isValidPassword(password);
            if (!isValidPassword) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        });
    });
}));
router.post("/login", passport.authenticate("local", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ username: req.body.username });
        const body = { _id: user._id, username: user.username };
        console.log(body);
        const token = jwt.sign({ user: body }, PRIVATE_KEY);
        return res.json({ token });
    });
});
router.post("/signup", body("username").isEmail(), body("password").isStrongPassword(), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next();
        }
        try {
            yield User.create({
                username: req.body.username,
                password: req.body.password,
            });
        }
        catch (_a) {
            return next();
        }
        res.redirect(307, "/auth/login");
    });
});
module.exports = { router };
//# sourceMappingURL=authentication.js.map