import React from 'react'

const LookingForDriver = ({setCancelRidePanel, setLookingForDriverPanelOpen,darkMode, pickup, destination, fare, vehicleType, selectedVehicleImage, paymentMethod}) => {
  return (
    <div>

      <h3 className="text-2xl font-semibold mt-2 mb-6 border-b-2 pb-4 border-blue-400 mt-8">Searching for a ride</h3>

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
              <h3 className="text-lg font-medium">{pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
          <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">{destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2 rounded-lg">
          <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{fare[vehicleType]}</h3>
              <p className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}>{paymentMethod}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setCancelRidePanel(true)
          }}
          className="w-full bg-red-700 text-white text-lg font-semibold p-3 rounded-lg active:bg-green-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default LookingForDriver
