import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";

const LogoutPanel = ({ darkMode, setLogoutPanel }) => {
  const navigate = useNavigate();

  async function onLogout() {
    try {
      const response = await axiosInstance.get("/users/logout");

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none">
      <div
        className={`${
          darkMode ? "bg-[#1B1B1B]" : "bg-[#eee]"
        } backdrop-blur-md rounded-2xl p-6 w-80 shadow-lg flex flex-col items-center pointer-events-auto`}
      >
        <h2
          className={`text-lg font-semibold mb-6 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Are you sure you want to logout?
        </h2>
        <div className="flex gap-4">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() => setLogoutPanel(false)}
            className={`px-4 py-2 ${
              darkMode
                ? "bg-[#242424] active:bg-[#343434]"
                : "bg-gray-400 active:bg-gray-500"
            } text-white rounded-lg shadow transition`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPanel;
