const express = require("express");
const cors = require("cors");
const http = require("http");
const auth = require("./routes/authentication.js");
const profile = require("./routes/profile.js");
const message = require("./routes/message.js");
const morgan = require("morgan");
const app = express();
const port: number = 3001;
import mongoose from "mongoose";
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket: any) => {
  socket.on("chat message", (msg: any) => {
    io.emit("chat message", msg);
  });
});

mongoose
  .connect("mongodb://localhost/network-matching", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result: any) =>
    server.listen(port, () => {
      console.log(`API is now listening at http://localhost:${port}`);
    })
  )
  .catch((err: any) => console.log(err));

const db = mongoose.connection;
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
app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html");
});
