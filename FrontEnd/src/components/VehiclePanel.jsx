import React from "react";
import { FaUserAlt } from "react-icons/fa";

const VehiclePanel = ({
  setVehiclePanelOpen,
  setConfirmRidePanelOpen,
  fare,
  setVehicleType,
  setSelectedVehicleImage,
  darkMode,
  setPanelOpen,
}) => {
  return (
    <div className="">
      <div
        onClick={() => {
          setVehiclePanelOpen(false);
          setPanelOpen(true);
        }}
        className="p-1 w-[100%] top-0 flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>
      <h3 className="text-2xl font-semibold mt-3 mb-6">Pick Your Ride</h3>

      <div
        onClick={() => {
          setConfirmRidePanelOpen(true);
          setVehicleType("car");
          setSelectedVehicleImage(
            "https://purepng.com/public/uploads/large/purepng.com-ford-focus-st-yellow-carcarvehicletransportford-961524664016apjao.png"
          );
        }}
        className={`flex w-full mb-3 items-centre justify-center p-3 border-2 ${
          darkMode
            ? "border-[#3c3c3c] active:bg-[#242424]"
            : "border-[#eee] active:bg-[#eee]"
        } duration-300 rounded-xl`}
      >
        <div className="flex items-center">
          <img
            className="h-[40px]"
            src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-st-yellow-carcarvehicletransportford-961524664016apjao.png"
            alt=""
          />
        </div>
        <div className="w-1/2 ml-2">
          <div className="flex items-center justify-start font-medium gap-1 text-lg">
            <span>EasyCab</span>
            <FaUserAlt className="text-sm" />
            <span>4</span>
          </div>
          <p
            className={`font-medium text-sm ${
              darkMode ? "text-[#757575]" : "text-gray-500"
            }`}
          >
            Easy rides, easy prices
          </p>
        </div>
        <h2 className="text-2xl font-semibold">&#8377;{fare.car}</h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanelOpen(true);
          setVehicleType("bike");
          setSelectedVehicleImage(
            "https://png.pngtree.com/png-vector/20250112/ourmid/pngtree-stylish-white-motorbike-png-image_15159259.png"
          );
        }}
        className={`flex w-full mb-3 items-centre justify-center p-3 border-2 ${
          darkMode
            ? "border-[#3c3c3c] active:bg-[#242424]"
            : "border-[#eee] active:bg-[#eee]"
        } duration-300 rounded-xl`}
      >
        <div className="">
          <img
            className="h-16"
            src="https://png.pngtree.com/png-vector/20250112/ourmid/pngtree-stylish-white-motorbike-png-image_15159259.png"
            alt=""
          />
        </div>
        <div className="w-1/2 ml-2">
          <div className="flex items-center justify-start font-medium gap-1 text-lg">
            <span>EcoBike</span>
            <FaUserAlt className="text-sm" />
            <span>1</span>
          </div>
          <p
            className={`font-medium text-sm ${
              darkMode ? "text-[#757575]" : "text-gray-500"
            }`}
          >
            Budget Bike Rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">&#8377;{fare.bike}</h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanelOpen(true);
          setVehicleType("auto");
          setSelectedVehicleImage(
            "https://i.pinimg.com/originals/2c/5e/14/2c5e1485755e664bcf7614cc4d492003.png"
          );
        }}
        className={`flex w-full mb-3 items-centre justify-center p-3 border-2 ${
          darkMode
            ? "border-[#3c3c3c] active:bg-[#242424]"
            : "border-[#eee] active:bg-[#eee]"
        } duration-300 rounded-xl`}
      >
        <div className="">
          <img
            className="h-16"
            src="https://i.pinimg.com/originals/2c/5e/14/2c5e1485755e664bcf7614cc4d492003.png"
            alt=""
          />
        </div>
        <div className="w-1/2 ml-2">
          <div className="flex items-center justify-start font-medium gap-1 text-lg">
            <span>MiniAuto</span>
            <FaUserAlt className="text-sm" />
            <span>3</span>
          </div>
          <p
            className={`font-medium text-sm ${
              darkMode ? "text-[#757575]" : "text-gray-500"
            }`}
          >
            Go far, pay less.
          </p>
        </div>
        <h2 className="text-2xl font-semibold">&#8377;{fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
