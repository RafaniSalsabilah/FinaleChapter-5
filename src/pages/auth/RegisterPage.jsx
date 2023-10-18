import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../services/auth/post_register_user";

const RegisterPage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const { mutate: regiterUser, isSuccess } = useCreateUser();
  const navigate = useNavigate()

  if (isSuccess) {
    navigate("/");
  }

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
    <div className="flex flex-col gap-[1rem] justify-center bg-gradient-to-r from-rose-100 to-teal-100 items-center w-full h-screen">
      <div className="form-container rounded-md p-[1rem] bg-gradient-to-r from-emerald-500 to-lime-600 h-[52%] w-[28%] flex flex-col justify-center items-center gap-4">
        <div className="text-register">
          <span className="font-black font-poppins text-[1.5rem]">
            Register Here
          </span>
        </div>
        <div className="input-section flex flex-col gap-4 w-[80%]">
          <div className="input-email flex flex-col gap-2 font-bold font-poppins tracking-wider text-[1rem]">
          <label>Email</label>
            <input
              onChange={handleInput}
              id="email"
              type="email"
              className="border-2 border-slate-600 focus:outline-none px-2 py-1 rounded-md"
            />
          </div>

          <div className="input-username flex flex-col gap-2 font-bold font-poppins tracking-wider text-[1rem]">
          <label>Username</label>
            <input
              onChange={handleInput}
              type="text"
              id="username"
              className="border-2 focus:outline-none border-slate-600 px-2 py-1 rounded-md"
            />
          </div>

          <div className="input-pass flex flex-col gap-2 font-bold font-poppins tracking-wider text-[1rem]">
            <label>Password</label>
            <input
              onChange={handleInput}
              type="password"
              id="password"
              className="border-2 border-slate-600 px-2 py-1 focus:outline-none rounded-md"
            />
          </div>
        </div>

        <div className="btn-section w-[60%]">
          <button
            onClick={() => {
              registerUser();
            }}
            className="bg-[#A4F9C8] px-4 py-2 hover:bg-[#214E34] my-2 hover:text-white rounded-full w-[100%] font-bold font-poppins tracking-wider focus:outline-none"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
