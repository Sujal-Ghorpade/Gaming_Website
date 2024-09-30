const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("You Are on Root Page Of Game Server");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("https://gaming-website-xuud.onrender.com/games", (req, res) => {
  res.render("allGames.ejs");
});

app.get("/games/simonsays.com", (req, res) => {
  res.render("simon.ejs");
});

app.get("/games/tictactoe.com", (req, res) => {
  res.render("tictactoe.ejs");
});
