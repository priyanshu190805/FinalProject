import React from 'react'
import profilePic from "../assets/profilePic.jpg";
import axios from 'axios';

const ChangeCaptainDp = ({darkMode, captain, setCaptainDpPanel}) => {

     const handleChangeCaptainDp = async (e) => {
        const image = e.target.files[0]

        if(!image){
            return null;
        }

        const formData = new FormData();
        formData.append("image", image)

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/captain-dp`, formData, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.status === 200){
                setCaptainDpPanel(false)
            }
        } catch (error) {
            console.error("Failed to upload profile photo", error);
        }
    }

  return (
      <div className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none">
        <div className={`${darkMode ? "bg-[#1B1B1B]" : "bg-[#eee]"} backdrop-blur-md rounded-2xl p-6 w-80 shadow-lg flex flex-col items-center pointer-events-auto`}>
          <img
            src={captain?.profilePhoto || profilePic}
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex gap-4 mt-6">
            <label className="px-4 py-2 bg-black text-white rounded-lg shadow cursor-pointer transition">
              Edit
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChangeCaptainDp}
              />
            </label>
          </div>
        </div>
      </div>
    );
}

export default ChangeCaptainDp
