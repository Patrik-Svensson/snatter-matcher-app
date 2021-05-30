const express = require("express");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const auth = require("./routes/authentication.js");
const user = require("./routes/user.js");
const message = require("./routes/message.js");
const conversation = require("./routes/conversation.js");
const morgan = require("morgan");
import mongoose from "mongoose";
const { Server } = require("socket.io");

const PORT: number = 3001;

// Open a connection to mongodb
mongoose
  .connect("mongodb://localhost/network-matching", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    io.on("connection", (socket: any) => {
      socket.on("chat message", (msg: any) => {
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
    app.use("/user", user.router);
    app.use("/message", message.router);
    app.use("/conversation", conversation.router);

    // ONLY FOR CHAT TESTING
    app.get("/", (req: any, res: any) => {
      res.sendFile(__dirname + "/index.html");
    });

    // Error middleware
    app.use(function (err: any, req: any, res: any, next: any) {
      console.log(err);
      res.status(400).send({ error: err.message });
    });

    // Start the server
    server.listen(PORT, () =>
      console.log(`API is now listening at http://localhost:${PORT}`)
    );
  })
  .catch((err: any) => console.log(err));

// Log when open or if error on connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to database");
});
