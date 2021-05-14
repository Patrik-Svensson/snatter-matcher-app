"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    members: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
    },
    messages: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Message",
    },
});
const Conversation = mongoose_1.model("Conversation", conversationSchema);
module.exports = Conversation;
//# sourceMappingURL=Conversation.js.map