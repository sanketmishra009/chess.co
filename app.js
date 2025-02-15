const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
const currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

server.listen(3000, () => {
  console.log("server running at:", 3000);
});
