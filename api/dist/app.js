"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const http = require("http");
const auth = require("./routes/authentication.js");
const profile = require("./routes/profile.js");
const message = require("./routes/message.js");
const morgan = require("morgan");
const app = express();
const port = 3001;
const mongoose_1 = __importDefault(require("mongoose"));
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});
mongoose_1.default
    .connect("mongodb://localhost/network-matching", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((result) => server.listen(port, () => {
    console.log(`API is now listening at http://localhost:${port}`);
}))
    .catch((err) => console.log(err));
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected to database");
});
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", auth.router);
app.use("/profile", profile.router);
app.use("/message", message.router);
// Only messaging testing
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//# sourceMappingURL=app.js.map