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
      className={`max-w-md mx-auto py-6 px-4 sm:px-5 w-full min-h-screen ${
        darkMode ? "bg-[#1b1b1b] text-white" : "bg-gray-100"
      } relative overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
      </div>

      <div
        className={`${
          darkMode ? "bg-[#242424] text-white" : "bg-white"
        } rounded-xl p-4 mb-4`}
      >
        <div className="flex items-start gap-4 mb-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={captain?.profilePhoto || profilePic}
                className="h-full w-full object-cover"
                alt="Captain"
              />
            </div>

            {!editing && (
              <button
                onClick={() => setCaptainDpPanel(true)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          <div className="text-sm sm:text-base">
            <h2 className="font-semibold text-lg sm:text-xl capitalize">
              {captain?.fullname.firstname + " " + captain?.fullname.lastname}
            </h2>
            <p
              className={`${
                darkMode ? "text-[#757575]" : "text-gray-500"
              } text-sm sm:text-base break-all`}
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
                className={`ri-pencil-fill text-xl sm:text-2xl ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              />
              <span className="text-sm sm:text-md">Update your name</span>
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
                className={`ri-shield-check-line text-xl sm:text-2xl ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              />
              <span className="text-sm sm:text-md">Change password</span>
            </div>
          </div>
        )}

        <button
          disabled={editing}
          onClick={() => setVehicleDetailsPanel(true)}
          className={`flex flex-col p-4 cursor-pointer gap-2 w-full text-left ${
            darkMode ? "active:bg-[#3c3c3c]" : "active:bg-[#eee]"
          }`}
        >
          <div className="flex items-center gap-3">
            <i
              className={`ri-car-fill text-xl sm:text-2xl ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            />
            <span className="text-sm sm:text-md font-semibold">
              Vehicle Details
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2 ml-8 text-xs sm:text-sm uppercase">
            {["company", "model", "vehicleType", "plate"].map((key, i) => (
              <div key={i}>
                <p
                  className={`${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  } text-[10px] sm:text-xs`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p
                  className={`${
                    darkMode ? "text-white" : "text-gray-700"
                  } break-words`}
                >
                  {captain?.vehicle?.[key] || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </button>
      </div>

      <div
        className={`${
          darkMode ? "bg-[#242424]" : "bg-white"
        } rounded-xl shadow mt-4 flex items-center px-6 py-3 justify-between`}
      >
        <span className="text-sm sm:text-lg font-medium">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </span>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${
            darkMode ? "bg-neutral-700" : "bg-gray-300"
          }`}
          aria-label="Toggle dark mode"
        >
          <span
            className={`absolute left-0 top-0 w-full h-full rounded-full transition-colors duration-300 ${
              darkMode ? "bg-neutral-700" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`inline-block w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <button
        onClick={() => setLogoutPanel(true)}
        className="flex items-center gap-2 absolute bottom-5 right-6 rounded-xl px-4 py-3 bg-black text-white cursor-pointer text-sm sm:text-base"
      >
        <i className="ri-logout-box-r-line text-lg sm:text-xl"></i>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default CaptainSettings;
