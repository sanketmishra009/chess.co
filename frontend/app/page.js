"use client";
import React from "react";
import useSWR from "swr";
import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { Chess } from "chess.js";
import ChessBoard from "./_components/_chessBoard";

const Page = () => {
  // console.log("inside");

  const fetcher = (url) => fetch(url).then((r) => r.text());

  const { resp, error, isLoading } = useSWR("http://localhost:3000", fetcher);

  // let resp = fetch("http://localhost:3000").then((res) => res.text());
  useEffect(() => {
    console.log("effect fired.");
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connected to server.", socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <ChessBoard />
    </div>
  );
};

export default Page;
