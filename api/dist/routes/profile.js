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
const express = require("express");
const { update } = require("../models/User");
const User = require("../models/User");
const passport = require("passport");
let router = express.Router();
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.query.username;
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                next();
            }
            res.json(user);
        });
    });
});
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.body._id;
        const age = req.body.age;
        delete req.body.username;
        const update = req.body;
        User.updateOne({ _id: id }, update, function (err, user) {
            if (err) {
                next();
            }
        });
        return res.json(update);
    });
});
module.exports = { router };
//# sourceMappingURL=profile.js.map