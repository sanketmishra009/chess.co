"use client";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col h-[60%] w-[60%] items-center justify-start pt-20 gap-10 bg-slate-900 rounded-3xl">
        <h1 className="w-auto text-2xl text-center font-extrabold underline bg-gradient-to-t from-slate-400 to-red-500 bg-clip-text ">
          Create User Account
        </h1>
        <div className="flex flex-col h-40  w-full  text-black font-bold justify-between items-center">
          <input
            className="w-[60%] border-2 border-black rounded-lg p-2 outline-none"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail((pemail) => e.target.value);
            }}
          />
          <input
            className=" w-[40%] border-2 border-black rounded-lg p-2 outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword((ppass) => e.target.value);
            }}
          />
          <button
            className="bg-violet-300 hover:bg-purple-700 hover:text-white rounded-lg w-1/4"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
