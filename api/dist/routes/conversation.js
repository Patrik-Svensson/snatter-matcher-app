"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
let router = express.Router();
const Conversation = require("../models/Conversation");
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    const conversations = [
        {
            id: 1,
            name: "Patrik Svensson",
            lastMessage: "hej",
            image: "/stock-profile.jpeg",
        },
        {
            id: 2,
            name: "Sebastian Nylén",
            lastMessage: "Errrrru go eller?",
            image: "/stock-profile.jpeg",
        },
    ];
    res.json(conversations);
});
module.exports = { router };
//# sourceMappingURL=conversation.js.map