import React, { useRef, useState } from "react";

const RidePopup = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide, darkMode }) => {
  return (
    <div>
      <div
        onClick={() => {
          setRidePopupPanel(false);
        }}
        className="p-1 w-[100%] top-0 flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>

      <h3 className="text-2xl font-semibold mt-2 mb-6">
        Incoming Ride Request
      </h3>

      <div className="flex items-center justify-between my-6 px-6 py-3 bg-yellow-400 rounded-lg">
          <h2 className="font-medium text-[19px] capitalize text-black">
          {`${ride?.user?.fullname?.firstname ?? "Unknown"} ${ride?.user?.fullname?.lastname ?? "User"}`}
          </h2>
        <h5 className="text-[19px] font-semibold text-black">{ride?.distance} Km</h5>
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
              <h3 className="text-xl font-medium">&#8377;{ride.fare}</h3>
              <p className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}>{ride?.paymentMethod}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setConfirmRidePopupPanel(true);
            confirmRide()
          }}
          className="w-full bg-green-600 text-white font-semibold text-lg p-3 rounded-lg active:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={() => {
            setRidePopupPanel(false);
          }}
          className={`w-full mt-1 ${darkMode ? "bg-[#3C3C3C] text-gray-200" : "bg-[#bbbbbb]  text-gray-700"} text-lg font-semibold p-3 rounded-lg`}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
