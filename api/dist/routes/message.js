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
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const conversationId = req.query.conversationId;
        const user = req.user;
        const conversation = yield Conversation.findOne({ _id: conversationId });
        if (!conversation.members.includes(user._id)) {
            return next();
        }
        const messages = yield Message.find({ conversation: conversationId });
        return res.json(messages);
    });
});
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageText = req.body.messageText;
        const conversationId = req.body.conversationId;
        const user = req.user;
        const conversation = yield Conversation.findOne({
            _id: conversationId,
        });
        console.log(conversation);
        if (!conversation.members.includes(user._id)) {
            return next();
        }
        const message = yield Message.create({
            text: messageText,
            timestamp: Date.now(),
            conversation: conversationId,
        });
        return res.json(message);
    });
});
module.exports = { router };
//# sourceMappingURL=message.js.map