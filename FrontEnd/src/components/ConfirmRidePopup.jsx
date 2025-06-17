import React from "react";
import { useNavigate } from "react-router-dom";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const ConfirmRidePopup = ({
  setCancelRideByCaptainPanel,
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride,
  darkMode,
  showPopup,
  otp,
  setOtp,
}) => {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosCaptainInstance.get("/rides/start-ride", {
        params: {
          rideId: ride._id,
          otp: otp,
        },
      });

      if (response.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: ride } });
      }
    } catch (error) {
      if (error.response?.status === 402) {
        showPopup("Invalid otp", "failed");
      } else {
        showPopup("Something went wrong. Please try again later.", "failed");
      }
    }
  };

  return (
    <div className="mt-9 px-2">
      <h3 className="text-2xl font-semibold mt-2 mb-6">
        Confirm this ride to start
      </h3>

      <div className="flex items-center justify-between my-6 py-3 px-6 bg-yellow-400 rounded-lg">
        <h2 className="font-medium text-[19px] capitalize text-black">{`${
          ride?.user?.fullname?.firstname ?? "Unknown"
        } ${ride?.user?.fullname?.lastname ?? "User"}`}</h2>
        <h5 className="text-[19px] font-semibold text-black">
          {ride?.distance} Km
        </h5>
      </div>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <div className="w-full">
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="text-xl ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">{ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{ride?.fare}</h3>
              <p className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}>
                {ride?.paymentMethod}
              </p>
            </div>
          </div>
        </div>
        <form className="w-full" onSubmit={submitHandler}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            placeholder="Enter OTP"
            className={`px-6 py-4 font-mono text-[19px] ${
              darkMode ? "bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eee]"
            } rounded-lg w-full my-10 focus:outline-none focus:ring-2 focus:ring-black`}
          />
          <button
            to="/captain-riding"
            className="w-full flex items-center  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg active:bg-green-700"
          >
            Confirm
          </button>
        </form>

        <button
          type="submit"
          onClick={() => {
            setCancelRideByCaptainPanel(true);
          }}
          className="w-full mt-2 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg active:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
