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
const LocalStrategy = require("passport-local").Strategy;
const DEV_MODE = true;
const PRIVATE_KEY = DEV_MODE
    ? "private_key_dummy"
    : fs.readFileSync("private.key");
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return done(err);
            }
            console.log(password);
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
    const token = jwt.sign({ user: body }, PRIVATE_KEY);
    return res.json({ token });
});
router.post("/signup", body("username").isEmail(), body("password").isStrongPassword(), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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