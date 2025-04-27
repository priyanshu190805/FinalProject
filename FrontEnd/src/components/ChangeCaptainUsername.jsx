import axios from 'axios';
import React, { useState } from 'react'
import axiosCaptainInstance from '../Utils/axiosCaptainInstance';

const ChangeCaptainUsername = ({darkMode, setChangeCaptainNamePanel, showPopup}) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    async function submitChangeName(e) {
      e.preventDefault();
      try {
        const response = await axiosCaptainInstance.post("/captains/update-name",
          {
            fullname : {
                firstname,
                lastname
            }
          },
        );
    
        if (response.status === 200) {
           showPopup('Profile name updated', "success")
            setChangeCaptainNamePanel(false);
        }
      } catch (err) {
        console.error("Password change failed:", err);
        showPopup("Something went wrong. Please try again later.", "failed")
      }
    }

    return (
        <div className={`max-w-md mx-auto px-6 py-7 ${darkMode ? "bg-[#1B1B1B] text-white" : "bg-gray-100"} min-h-screen`}>
          <h2 className="text-3xl font-bold mb-12">Rename yourself</h2>
    
          <form onSubmit={submitChangeName} className="space-y-6">
            <div>
              <label className={`block mb-2 text-lg font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "border-gray-300"} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              />
            </div>
    
            <div>
              <label className={`block mb-2 text-lg font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "border-gray-300"} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              />
            </div>
    
            <button
              type="submit"
              className="w-full text-lg bg-black text-white py-3 rounded-xl font-semibold active:scale-105 transition duration-300"
            >
              Rename
            </button>
          </form>
        </div>
      );
}

export default ChangeCaptainUsername
