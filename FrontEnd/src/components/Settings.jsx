import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ThemeDataContext } from "../context/ThemeContext";
import profilePic from "../assets/profilePic.jpg";

const Settings = ({
  user,
  setChangePasswordPanel,
  setChangeUsernamePanel,
  setChangeDpPanel,
  setLogoutPanel
}) => {
  const { darkMode, setDarkMode } = useContext(ThemeDataContext);


  return (
    <div
      className={`max-w-md mx-auto py-9 px-5 w-full min-h-screen ${
        darkMode ? "bg-[#1B1B1B] text-white" : "bg-gray-100"
      } relative`}
    >


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div
        className={`${
          darkMode ? "bg-[#242424] text-white" : "bg-white"
        } rounded-xl p-4 mb-4`}
      >
        <div className="flex items-start gap-4 ">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={user?.profilePhoto || profilePic}
                className="h-full w-full object-cover"
              />
            </div>
            
            <button
              onClick={() => {
                setChangeDpPanel(true)
              }}
              className="mt-2 text-md text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div>
            <h2 className="font-semibold text-xl capitalize">
              {user?.fullname.firstname + " " + user?.fullname?.lastname}
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-[#757575]" : "text-gray-500"
              }`}
            >
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${
          darkMode
            ? "bg-[#242424] text-white divide-[#3c3c3c]"
            : "bg-white divide-gray-300"
        } rounded-xl shadow divide-y`}
      >
        <div
          onClick={() => {
            setChangeUsernamePanel(true);
          }}
          className={`flex justify-between items-center p-4 ${
            darkMode ? "active:bg-[#3c3c3c]" : "active:bg-[#eee]"
          } cursor-pointer`}
        >
          <div className="flex items-center gap-3">
            <i
              className={`ri-pencil-fill text-2xl ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            />
            <span
              className={`text-md ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Update your name
            </span>
          </div>
        </div>
        <div
          onClick={() => {
            setChangePasswordPanel(true);
          }}
          className={`flex justify-between items-center p-4 ${
            darkMode ? "active:bg-[#3c3c3c]" : "active:bg-[#eee]"
          } cursor-pointer`}
        >
          <div className="flex items-center gap-3">
            <i
              className={`ri-shield-check-line text-2xl ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            />
            <span
              className={`text-md ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Change Password
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${
          darkMode ? "bg-[#242424]" : "bg-white"
        } rounded-xl shadow divide-y divide-gray-200 mt-4 flex items-center px-6 justify-between`}
      >
        <span className="text-lg">{darkMode ? "Light Mode" : "Dark mode"}</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 my-3 ${
            darkMode ? "bg-[#131313]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
              darkMode ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <button
        onClick={() => setLogoutPanel(true)}
        className="flex items-center gap-2 absolute bottom-5 right-6 rounded-xl px-4 py-3 bg-black text-white cursor-pointer active:scale-105 duration-300"
      >
        <i className="ri-logout-box-r-line text-xl"></i>
        <span className="text-md">Logout</span>
      </button>
    </div>
  );
};

export default Settings;
