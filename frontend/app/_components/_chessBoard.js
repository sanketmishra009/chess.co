"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import socket from "../socket";

const ChessBoard = () => {
  // const [draggedPiece, setdraggedPiece] = useState(null);
  // const [sourceSquare, setsourceSquare] = useState(null);
  const [playerRole, setplayerRole] = useState("b");
  const [chess, setChess] = useState(new Chess());

  let draggedPiece = useRef(null);

  let sourceSquare = null;

  const boardElement = useRef(null);
  const temprow = useRef(null);
  const tempsq = useRef(null);
  const board = chess.board();

  if (playerRole === "b") board.reverse();

  const getUnicodes = (piece) => {
    const unicodes = {
      p: "♟",
      r: "♜",
      n: "♞",
      b: "♝",
      k: "♚",
      q: "♛",
      P: "♙",
      R: "♖",
      N: "♘",
      B: "♗",
      K: "♔",
      Q: "♕",
    };
    let q = piece.type;
    if (piece.color === "w") {
      // console.log("color black");
      q = q.toUpperCase();
    }
    // console.log(piece.color, q);
    return unicodes[q || ""];
  };

  useEffect(() => {
    console.log(board);

    return () => {};
  }, []);

  const handleDrag = (e) => {
    //
    // e.preventDefault();
    e.stopPropagation();
    if (e.target.draggable) {
      draggedPiece.current = e.target;
      const row = e.target.dataset.row,
        col = e.target.dataset.col;
      sourceSquare = { row: row, col: col };
      e.dataTransfer.setData("text/plain", "");
      // console.log(e.target.dataset);
    }
    console.log("drag start");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedPiece) {
      const targetSquare = {
        row: parseInt(e.target.dataset.row),
        col: parseInt(e.target.dataset.col),
      };
      console.log("dropped at", targetSquare);
    }
    handleMove(sourceSquare, targetSquare);
    draggedPiece = null;
    sourceSquare = null;
    return true;
    // console.log("drag end at ", e.target.dataset.row, e.target.dataset.col);
  };

  const handleMove = (source, target) => {
    const move = {
      from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
      to: `${String.fromCharCode(97 + target.col)} ${8 - source.row}`,
      promotion: "q",
    };
  };

  useEffect(() => {
    socket.on("playerRole", (role) => {
      setplayerRole((prole) => {
        role;
      });
      // renderBoard();
    });

    socket.on("spectatorRole", () => {
      setplayerRole((prole) => null);
    });

    socket.on("boardState", (fen) => {
      setChess(() => {
        new Chess(fen);
      });
    });

    socket.on("move", (move) => {
      setChess((pchess) => {
        move: move, [...pchess];
      });
    });

    return () => {
      socket.off("playerRole");
      socket.off("spectatorRole");
      socket.off("boardState");
    };
  }, []);

  return (
    <div>
      <div className="bg-zinc-900 h-screen flex items-center justify-center">
        <div
          ref={boardElement}
          className="h-[80vh] w-[80vh] bg-pink-900 text-black flex flex-col justify-between items-center"
        >
          {board.map((row, rowi) => {
            return (
              <div className="flex w-full justify-around">
                {row.map((item, itemi) => {
                  // console.log(item);
                  return (
                    <div
                      className={`${
                        (itemi + rowi) % 2 !== 0
                          ? "bg-[#F2E1C3] text-white"
                          : "bg-[#C3A082]"
                      } h-24 w-24 p-2 text-center pt-8`}
                      // draggable={
                      //   playerRole && item ? playerRole === item.color : false
                      // }
                    >
                      <div
                        data-row={rowi}
                        data-col={itemi}
                        className={`${
                          playerRole && item && playerRole === item.color
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        } text-[3rem] ${
                          item && item.color === "w" ? "bg-white" : "bg-black"
                        } bg-clip-text text-transparent`}
                        draggable={
                          playerRole && item ? playerRole === item.color : false
                        }
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {item !== null ? item.type : null}
                        {item !== null ? getUnicodes(item) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
