import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-cover bg-center bg-no-repeat bg-[url(https://images.unsplash.com/photo-1520291917596-d372d7f2ec39?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex flex-col justify-between">
        <div className="w-full flex justify-start px-4 sm:px-8">
          <img src={Logo} className="w-16 rounded-xl" />
        </div>
        <div className="bg-white pb-6 py-4 px-4 sm:px-6 md:px-8 flex flex-col items-center">
          <h2 className="text-[23px] font-bold text-center">
            Start Your Journey with PickMe
          </h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-[95%] bg-black py-3 rounded mt-5 text-white hover:scale-105 duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
