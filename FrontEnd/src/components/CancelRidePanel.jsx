import React from "react";
import axiosInstance from "../Utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CancelRidePanel = ({
  darkMode,
  setCancelRidePanel,
  setConfirmRidePanelOpen,
  setVehiclePanelOpen,
  setLookingForDriverPanelOpen,
  ride,
  showPopup,
  setWaitForDriverPanelOpen,
  setEditing,
  isFromRidingPage = false,
}) => {
  const navigate = useNavigate();
  async function deleteRide() {
    try {
      const response = await axiosInstance.post("/rides/cancel-ride", {
        rideId: ride?._id,
      });

      if (response.status === 200) {
        setCancelRidePanel(false);

        if (!isFromRidingPage) {
          setConfirmRidePanelOpen(false);
          setVehiclePanelOpen(false);
          setLookingForDriverPanelOpen(false);
          setWaitForDriverPanelOpen(false);
          setEditing(false);
        }

        navigate("/start");

        showPopup("Your ride has been cancelled.", "success");
      }
    } catch (err) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center">
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
          Confirm ride cancellation?
        </h2>
        <div className="flex gap-4">
          <button
            onClick={deleteRide}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow active:bg-red-700 transition"
          >
            Cancel Ride
          </button>
          <button
            onClick={() => setCancelRidePanel(false)}
            className={`px-4 py-2 ${
              darkMode
                ? "bg-[#242424] active:bg-[#343434]"
                : "bg-gray-400 active:bg-gray-500"
            } text-white rounded-lg shadow transition`}
          >
            Keep Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRidePanel;
