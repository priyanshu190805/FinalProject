import React, { useState } from "react";
import captainLogo from "../assets/captainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { PopupDataContext } from "../context/PopupContext";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCaptain } = useContext(CaptainDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const captainData = {
        email: email,
        password: password,
      };
      const response = await axiosCaptainInstance.post(
        "/captains/login",
        captainData
      );
      if (response.status === 200) {
        const { accessToken, captain } = response.data;

        setCaptain(captain);

        localStorage.setItem("token", accessToken);

        navigate("/captain-start");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response?.status === 400) {
        showPopup("Incorrect username or password.", "failed");
      } else {
        showPopup("Something went wrong. Please try again later.", "failed");
      }
    }
  };

  return (
    <div className="pt-8 py-7 px-7 flex flex-col justify-between h-screen">
      {popupMessage && (
        <div
          className={`absolute top-0 left-0 w-full ${
            popupStatus === "success" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 text-sm text-center z-50`}
        >
          {popupMessage}
        </div>
      )}
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <img src={captainLogo} className="w-16 rounded-xl mb-10" />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            className="mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            className="mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="password"
          />
          <button className="mb-3 bg-black text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 ">
            Login
          </button>
        </form>
        <p className="text-center">
          Join as captain?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login"
          className="flex items-center justify-center mb-5 bg-yellow-500 text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
