"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";

const ChessBoard = () => {
  const [draggedPiece, setdraggedPiece] = useState(null);
  const [sourceSquare, setsourceSquare] = useState(null);
  const [playerRole, setplayerRole] = useState("b");

  const boardElement = useRef(null);
  const temprow = useRef(null);
  const tempsq = useRef(null);
  const chess = new Chess();
  const board = chess.board();

  const renderBoard = () => {
    // console.log(board);
  };

  useEffect(() => {
    console.log(board);

    return () => {};
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
                  return (
                    <div
                      className={`${
                        (itemi + rowi) % 2 !== 0
                          ? "bg-black text-white"
                          : "bg-white"
                      } h-24 w-24 p-2 text-center pt-8`}
                      draggable={
                        playerRole && item ? playerRole === item.color : false
                      }
                    >
                      {item !== null ? item.type : null}
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
