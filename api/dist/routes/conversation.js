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
const passport = require("passport");
let router = express.Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const conversations = yield Conversation.find({
            members: user._id,
        }).populate("messages");
        return res.json(conversations);
    });
});
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const addedMembers = req.body.addedMembers.map((user) => user._id);
        const members = addedMembers.push(user._id);
        const conversation = yield Conversation.create({ members: members });
        return res.json({ conversation });
    });
});
module.exports = { router };
//# sourceMappingURL=conversation.js.map