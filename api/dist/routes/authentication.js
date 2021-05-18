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
const localStrategy = require("passport-local").Strategy;
passport.use("signup", new localStrategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.create({ username, password });
        return done(null, user);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
})));
passport.use("login", new localStrategy({
    usernameField: "username",
    passwordField: "password",
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username });
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        const validate = user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
    }
    catch (error) {
        return done(error);
    }
})));
router.post("/signup", body("username").isEmail(), body("password").isStrongPassword(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, passport.authenticate("signup", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.username };
                const token = jwt.sign({ user: body }, "TOP_SECRET");
                return res.json({ message: "signup success", token: token });
            }));
        }
        catch (error) {
            console.log("Spagetti!");
            return next(error);
        }
    }))(req, res, next);
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.username };
                const token = jwt.sign({ user: body }, "TOP_SECRET");
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
}));
module.exports = { router };
//# sourceMappingURL=authentication.js.map