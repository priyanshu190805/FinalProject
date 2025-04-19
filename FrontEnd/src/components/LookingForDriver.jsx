import React from 'react'

const LookingForDriver = ({setLookingForDriverPanelOpen, pickup, destination, fare, vehicleType, selectedVehicleImage}) => {
  return (
    <div>
      <div onClick={() => {setLookingForDriverPanelOpen(false)}} className="p-1 w-[100%] top-0 flex items-center justify-center">
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>

      <h3 className="text-2xl font-semibold mt-2 mb-6 border-b-2 pb-4 border-blue-400">Searching for a ride</h3>

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
      </div>
    </div>
  )
}

export default LookingForDriver
