"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const auth = require("./routes/authentication.js");
const profile = require("./routes/profile.js");
const message = require("./routes/message.js");
const morgan = require("morgan");
const mongoose_1 = __importDefault(require("mongoose"));
const { Server } = require("socket.io");
const PORT = 3001;
// Open a connection to mongodb
mongoose_1.default
    .connect("mongodb://localhost/network-matching", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    io.on("connection", (socket) => {
        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });
    });
    // Middleware pipeline
    app.use(cors());
    app.use(morgan("tiny"));
    app.use(passport.initialize());
    app.use(express.json());
    app.use(express.static("public"));
    app.use("/auth", auth.router);
    app.use("/profile", profile.router);
    app.use("/message", message.router);
    // ONLY FOR CHAT TESTING
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
    });
    // Error middleware
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(400).send({ error: err.message });
    });
    // Start the server
    server.listen(PORT, () => console.log(`API is now listening at http://localhost:${PORT}`));
})
    .catch((err) => console.log(err));
// Log when open or if error on connection
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected to database");
});
//# sourceMappingURL=app.js.map