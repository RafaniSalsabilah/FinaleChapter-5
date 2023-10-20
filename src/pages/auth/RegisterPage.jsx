import React from "react";
import { useState } from "react";
import { useCreateUser } from "../../services/auth/post_register_user";

const RegisterPage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const backgroundImageUrl = require("../../assets/img/poster-bg.jpg");

  const { mutate: regiterUser } = useCreateUser();

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "username") {
        setUsername(e.target.value);
      }

      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const registerUser = () => {
    regiterUser({
      email: Email,
      name: Username,
      password: Password,
    });
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className="absolute w-full top-0 left-0 h-full bg-opacity-60 bg-black"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="absolute w-full bottom-0 left-0 h-15 bg-gradient-to-t from-black to-transparent"
        style={{ zIndex: 2 }}
      ></div>
      <div
        className="rounded-md bg-gradient-to-r from-rose-600 to-red-400 h-[19.5rem] w-[25rem] flex flex-col items-center shadow-lg shadow-slate-600"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-white font-bold text-3xl mt-[1rem] mb-[2rem]">
            Register Here
          </h1>
          <input
            onChange={handleInput}
            id="email"
            type="email"
            className="font-bold border-2 border-slate-600 focus:outline-none px-2 py-1 rounded-md h-[2.5rem] w-[20rem] mb-[1rem]"
            placeholder="Email"
          />
          <input
            onChange={handleInput}
            id="username"
            type="text"
            className="font-bold border-2 border-slate-600 focus:outline-none px-2 py-1 rounded-md h-[2.5rem] w-[20rem] mb-[1rem]"
            placeholder="Username"
          />
          <input
            onChange={handleInput}
            id="password"
            type="password"
            className="font-bold border-2 border-slate-600 focus:outline-none px-2 py-1 rounded-md h-[2.5rem] w-[20rem]"
            placeholder="Password"
          />
        </div>
        <div className="btn-section">
          <div className="flex flex-row justify-center w-[20rem] my-[1rem]">
            <button
              onClick={() => {
                registerUser();
              }}
              className="bg-white hover:bg-rose-400 rounded-md w-[10rem] mr-[1rem] h-[2.5rem] font-bold font-poppins tracking-wider focus:outline-none"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
