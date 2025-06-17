import React from "react";

import profilePic from "../assets/profilePic.jpg";

const CaptainSettings = ({
  captain,
  editing,
  setLogoutPanel,
  setVehicleDetailsPanel,
  setCaptainDpPanel,
  darkMode,
  setDarkMode,
  setChangeCaptainNamePanel,
  setChangeCaptainPasswordPanel,
}) => {
  return (
    <div
      className={`max-w-md mx-auto py-7 px-5 w-full min-h-screen ${
        darkMode ? "bg-[#1b1b1b] text-white" : "bg-gray-100"
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
        <div className="flex items-start gap-4 mb-2">
          <div className="flex flex-col">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src={captain?.profilePhoto || profilePic}
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            {!editing && (
              <button
                onClick={() => {
                  setCaptainDpPanel(true);
                }}
                className="mt-2 text-md text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-xl capitalize">
              {captain?.fullname.firstname + " " + captain?.fullname.lastname}
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-[#757575]" : "text-gray-500"
              }`}
            >
              {captain?.email}
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
        {!editing && (
          <div
            onClick={() => setChangeCaptainNamePanel(true)}
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
              <div className="flex flex-col">
                <span
                  className={`text-md ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Update your name
                </span>
              </div>
            </div>
          </div>
        )}

        {!editing && (
          <div
            onClick={() => setChangeCaptainPasswordPanel(true)}
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
              <div className="flex flex-col">
                <span
                  className={`text-md ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Change password
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={editing}
          onClick={() => setVehicleDetailsPanel(true)}
          className={`flex flex-col p-4 cursor-pointer gap-2 w-full ${
            darkMode ? "active:bg-[#3c3c3c]" : "active:bg-[#eee]"
          }`}
        >
          <div className="flex items-center gap-3">
            <i
              className={`ri-car-fill text-2xl ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            />
            <span
              className={`text-md font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Vehicle Details
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2 ml-9 text-sm uppercase">
            <div>
              <p
                className={`${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } text-xs`}
              >
                Company
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-700"}`}>
                {captain?.vehicle?.company || "N/A"}
              </p>
            </div>
            <div>
              <p
                className={`${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } text-xs`}
              >
                Model
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-700"}`}>
                {captain?.vehicle?.model || "N/A"}
              </p>
            </div>
            <div>
              <p
                className={`${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } text-xs`}
              >
                Type
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-700"}`}>
                {captain?.vehicle?.vehicleType || "N/A"}
              </p>
            </div>
            <div>
              <p
                className={`${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } text-xs`}
              >
                Plate
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-700"}`}>
                {captain?.vehicle?.plate || "N/A"}
              </p>
            </div>
          </div>
        </button>
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
        className="flex items-center gap-2 absolute bottom-5 right-6 rounded-xl px-4 py-3 bg-black text-white cursor-pointer"
      >
        <i className="ri-logout-box-r-line text-xl"></i>
        <span className="text-md">Logout</span>
      </button>
    </div>
  );
};

export default CaptainSettings;
