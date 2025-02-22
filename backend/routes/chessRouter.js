const express = require("express");
const router = express.Router();
const { Chess } = require("chess.js");
const socket = require("socket.io");
const { server } = require("../app");

const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const chess = new Chess();
let players = {};
const currentPlayer = "w";

// console.log(io);

io.on("connection", (socket) => {
  console.log("connected with socket.", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
    if (socket.id === players.white) {
      delete players.white;
    } else if (socket.id === players.black) {
      delete players.balck;
    }
  });

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectatorRole");
  }

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

module.exports = router;
