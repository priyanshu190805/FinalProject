import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const ChangePassword = ({ setChangePasswordPanel, darkMode, showPopup }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function submitPasswordChange(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/change-password", {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        showPopup("Password changed successfully", "success");
        setChangePasswordPanel(false);
      }

      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response?.status === 400) {
        showPopup("Invalid old password", "failed");
      } else {
        showPopup("Something went wrong. Please try again later.", "failed");
      }
    }
  }

  return (
    <div
      className={`max-w-md mx-auto px-6 py-9 ${
        darkMode ? "bg-[#1B1B1B] text-white" : "bg-gray-100"
      } min-h-screen`}
    >
      <h2 className="text-3xl font-bold mb-12">Change Password</h2>

      <form onSubmit={submitPasswordChange} className="space-y-6">
        <div>
          <label
            className={`block mb-2 text-lg font-medium ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Old Password
          </label>
          <input
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`w-full px-4 py-3 border ${
              darkMode
                ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]"
                : "border-gray-300"
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-lg font-medium ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-4 py-3 border ${
              darkMode
                ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]"
                : "border-gray-300"
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>

        <button
          type="submit"
          className="w-full text-lg bg-black text-white py-3 rounded-xl font-semibold active:scale-105 transition duration-300"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
