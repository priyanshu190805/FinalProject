import React, { useState } from "react";
import axios from "axios";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const ChangeVehicleDetails = ({ setVehicleDetailsPanel, darkMode , showPopup}) => {
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  async function submitVehicleDetailsChange(e) {
    e.preventDefault();
    try {
      const response = await axiosCaptainInstance.post("/captains/update-vehicle-details",
        {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType,
          company: vehicleCompany,
          model: vehicleModel,
        },
      );

      if (response.status === 200) {
        setVehicleDetailsPanel(false);
        showPopup('Vehicle details updated successfully.', "success")
      }
    } catch (err) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  return (
    <div
      className={`max-w-md mx-auto px-6 py-7 ${
        darkMode ? "bg-[#1B1B1B] text-white" : "bg-gray-100"
      } min-h-screen`}
    >
      <h2 className="text-3xl font-bold mb-12">Update Vehicle</h2>

      <form className="space-y-6" onSubmit={submitVehicleDetailsChange}>
        <div className="flex gap-2 mb-4">
          <input
            value={vehicleCompany}
            onChange={(e) => setVehicleCompany(e.target.value)}
            required
            type="text"
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} rounded-lg py-2 px-4 border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Company"
          />
          <input
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
            type="text"
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} rounded-lg py-2 px-4  border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Model"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <select
            required
            value={vehicleType}
            onChange={(e) => {
              const selectedType = e.target.value;
              setVehicleType(selectedType);

              if (selectedType === "car") {
                setVehicleCapacity(4);
              } else if (selectedType === "bike") {
                setVehicleCapacity(1);
              } else if (selectedType === "auto") {
                setVehicleCapacity(3);
              }
            }}
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} py-2 px-4 rounded-lg border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
          <input
            value={vehicleCapacity}
            disabled
            type="number"
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} py-2 px-4 rounded-lg border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Capacity"
          />
          
        </div>

        <div className="flex gap-2 mb-6">
        <input
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            type="text"
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} py-2 px-4 rounded-lg border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Plate Number"
          />
          <input
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
            type="text"
            className={`${darkMode ? "border-[#1B1B1B] bg-[#3c3c3c] placeholder:text-[#b3b3b3]" : "bg-[#eeeeee]"} py-2 px-4 rounded-lg border w-1/2 text-[15px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Color"
          />
          
        </div>

        <button
          type="submit"
          className="w-full text-lg bg-black text-white py-3 rounded-xl font-semibold active:scale-105 transition duration-300"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default ChangeVehicleDetails;
