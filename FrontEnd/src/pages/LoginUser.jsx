import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { PopupDataContext } from "../context/PopupContext";
import axiosInstance from "../Utils/axiosInstance";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await axiosInstance.post("/users/login", userData);

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        setUser(user);
        localStorage.setItem("token", accessToken);
        navigate("/start");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response?.status === 401) {
        showPopup("Incorrect username or password.", "failed");
      } else {
        showPopup("Something went wrong. Please try again later.", "failed");
      }
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-7 flex flex-col justify-between">
      {popupMessage && (
        <div
          className={`fixed top-0 left-0 w-full z-50 text-white text-sm text-center py-2 ${
            popupStatus === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popupMessage}
        </div>
      )}

      <div className="w-full max-w-md mx-auto">
        <form onSubmit={submitHandler}>
          <div>
            <img src={Logo} className="w-16 rounded-xl mb-10" />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="password"
          />
          <button className="mb-3 bg-black text-white text-lg py-2 px-4 rounded w-full active:scale-105 duration-300">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>

      <div className="w-full max-w-md mx-auto mt-5">
        <Link
          to="/captain-login"
          className="flex items-center justify-center mb-5 bg-teal-600 text-white text-lg py-2 px-4 rounded w-full active:scale-105 duration-300"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default LoginUser;
