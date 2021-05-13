const express = require("express");
const cors = require("cors");
const auth = require("./routes/authentication.js");
const profile = require("./routes/profile.js");
const morgan = require("morgan");
const app = express();
const port: number = 3001;
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/network-matching", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log(`API is now listening at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));

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
