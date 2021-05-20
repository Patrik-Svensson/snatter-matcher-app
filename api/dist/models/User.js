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
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
var UserStatus;
(function (UserStatus) {
    UserStatus["Pending"] = "pending";
    UserStatus["Ready"] = "ready";
})(UserStatus || (UserStatus = {}));
var UserGender;
(function (UserGender) {
    UserGender["Male"] = "male";
    UserGender["Female"] = "female";
})(UserGender || (UserGender = {}));
var UserOffering;
(function (UserOffering) {
    UserOffering["Coaching"] = "coaching";
    UserOffering["Mentorship"] = "mentoship";
    UserOffering["Networking"] = "networking";
})(UserOffering || (UserOffering = {}));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "ready"],
        default: "pending",
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    offers: {
        type: [String],
        enum: ["coaching", "mentorship", "networking"],
    },
    lookingFor: {
        type: [String],
        enum: ["coaching", "mentorship", "networking"],
    },
    jobs: {
        type: [String],
    },
    educations: {
        type: [String],
    },
    networks: {
        type: [mongoose_1.Types.ObjectId],
        ref: "Network",
    },
    recommendations: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
    },
    conversations: {
        type: [mongoose_1.Types.ObjectId],
        ref: "Conversation",
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    });
});
userSchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const compare = yield bcrypt.compare(password, this.password);
        console.log(compare);
        return compare;
    });
});
const User = mongoose_1.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map