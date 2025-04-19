import React from "react";
import { FaChevronDown } from "react-icons/fa";

const ConfirmRide = ({ setLookingForDriverPanelOpen, setConfirmRidePanelOpen, createRide, pickup, destination, fare, vehicleType, selectedVehicleImage}) => {
  return (
    <div className="">
      <div onClick={() => {setConfirmRidePanelOpen(false)}} className="p-1 w-[100%] top-0 flex items-center justify-center">
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>

      <h3 className="text-2xl font-semibold mt-2 mb-6">Confim Your Ride</h3>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <img
          className="h-20"
          src={selectedVehicleImage}
          alt=""
        />
        <div className="w-full">
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="text-xl ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-xl font-medium">{pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">{destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{fare[vehicleType]}</h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setLookingForDriverPanelOpen(true);
            setConfirmRidePanelOpen(false)
            createRide()
          }}
          className="w-full bg-green-600 text-white text-lg font-semibold p-3 rounded-lg active:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
