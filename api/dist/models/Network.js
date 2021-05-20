"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const networkSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    users: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
    },
});
const Network = mongoose_1.model("Network", networkSchema);
module.exports = Network;
//# sourceMappingURL=Network.js.map