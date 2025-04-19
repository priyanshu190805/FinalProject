import axios from "axios";
import React from "react";
import profilePic from "../assets/profilePic.jpg";

const ChangeDp = ({ user, setChangeDpPanel , darkMode, showPopup}) => {
  const handleImageChange = async (e) => {
    const image = e.target.files[0];

    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        showPopup('Profile photo updated.')
        setChangeDpPanel(false);
      }
    } catch (error) {
      console.error("Failed to upload profile photo", err);
    }
  };

  async function deleteDp(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/delete-photo`,{
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status === 200){
        showPopup('Profile photo deleted')
        setChangeDpPanel(false)
      }
    } catch (error) {
      console.error("Failed to delete profile photo", err);
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none">
      <div className={`${darkMode ? "bg-[#1B1B1B]" : "bg-[#eee]"} backdrop-blur-md rounded-2xl p-6 w-80 shadow-lg flex flex-col items-center pointer-events-auto`}>
        <img
          src={user?.profilePhoto || profilePic}
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
              onChange={handleImageChange}
            />
          </label>
          {user.profilePhoto && (
            <button onClick={() => deleteDp()} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeDp;
