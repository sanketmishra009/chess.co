const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const chess = new Chess();
let players = {};
const currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.render("index");
  // console.log("request from", req);
  res.send("Hello from the server");
});

io.on("connection", (socket) => {
  console.log("connected with socket.", socket.id);
  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("server running at:", 3000);
});
