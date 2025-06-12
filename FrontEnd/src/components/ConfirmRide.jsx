import React, { useState } from "react";

const ConfirmRide = ({
  darkMode,
  setEditing,
  setLookingForDriverPanelOpen,
  setConfirmRidePanelOpen,
  createRide,
  pickup,
  destination,
  fare,
  vehicleType,
  selectedVehicleImage,
  paymentMethod,
  setPaymentMethod
}) => {

  return (
    <div className="">
      <div
        onClick={() => {
          setConfirmRidePanelOpen(false);
        }}
        className="p-1 w-[100%] top-0 flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>

      <h3 className="text-2xl font-semibold mt-2 mb-6">Confirm Your Ride</h3>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <img className="h-20" src={selectedVehicleImage} alt="" />
        <div className="w-full">
          <div
            className={`flex items-center gap-3 p-2 border-b-2 ${
              darkMode ? "border-[#5b5b5b]" : "border-[#eee]"
            } mb-2 rounded-lg`}
          >
            <i className="text-xl ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">{pickup}</h3>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 p-2 border-b-2 ${
              darkMode ? "border-[#5b5b5b]" : "border-[#eee]"
            } mb-2 rounded-lg`}
          >
            <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">{destination}</h3>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 p-2 border-b-2 ${
              darkMode ? "border-[#5b5b5b]" : "border-[#eee]"
            } mb-2 rounded-lg`}
          >
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="flex gap-1 w-full items-center justify-between">
              <h3 className="text-xl font-medium">
                &#8377;{fare[vehicleType]}
              </h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={`w-[50%] p-2 rounded-md border ${
                  darkMode ? "bg-[#333] text-white border-[#242424]" : "bg-white border-gray-300 text-black "
                } w-[50%] focus:outline-none focus:ring-2 focus:ring-black`}
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            createRide();
          }}
          className="w-full bg-green-600 text-white text-lg font-semibold p-3 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
