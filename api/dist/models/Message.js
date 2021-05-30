"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    conversation: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
});
const Message = mongoose_1.model("Message", messageSchema);
module.exports = Message;
//# sourceMappingURL=Message.js.map