const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

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

//routes
const authRouter = require("./routes/authRouter.js");

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/chess", (req, res) => {
  // console.log("request from", req);
  // res.send("Hello from the server");
  res.send("index page");
});

app.use("/auth", authRouter);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

io.on("connection", (socket) => {
  console.log("connected with socket.", socket.id);

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectatorRole");
  }

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
    if (socket.id === players.white) {
      delete players.white;
    } else if (socket.id === players.black) {
      delete players.balck;
    }
  });

  socket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;

      const result = chess(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid Move:", move);
        socket.emit("invalidMove", move);
      }
    } catch (error) {
      console.log(error);
      socket.emit("Invalid Move:", move);
    }
  });
});

server.listen(3000, () => {
  console.log("server running at:", 3000);
});
