import React from 'react'

const UserRidingPanel = ({ride,darkMode, setCancelRidePanel}) => {
  return (
    <div className="flex flex-col mt-2 px-4 py-5 overflow-hidden">
        <div className="flex items-center justify-between px-2 pb-5 border-b-2 border-[#eee]">
          <img
            src={ride?.captain?.profilePhoto || "/default-avatar.png"}
            alt="Captain DP"
            className="w-14 h-14 rounded-full object-cover border border-gray-300"
          />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-[19px] font-medium capitalize">{`${
                ride?.captain?.fullname?.firstname ?? "Unknown"
              } ${ride?.captain?.fullname?.lastname ?? ""}`}</h2>

              <div className="flex gap-3 mt-2">
                <div className="flex items-end">
                  <img
                    className="h-11"
                    src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-st-yellow-carcarvehicletransportford-961524664016apjao.png"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="text-[21px] font-semibold -mb-1 -mt-1">
                    {ride?.captain?.vehicle?.plate}
                  </h4>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-[#757575]" : "text-gray-500"
                    }`}
                  >{`${ride?.captain?.vehicle?.company} ${ride?.captain?.vehicle?.model}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full gap-2 flex-col">
          <div className="w-full">
            <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
              <i className="text-xl ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.destination}</h3>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-[#eee] mb-2">
              <i className="ri-money-rupee-circle-fill text-xl"></i>
              <div>
                <h3 className="text-xl font-medium">&#8377;{ride?.fare}</h3>
                <p
                  className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}
                >
                  {ride?.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <button className="w-full bg-green-600 text-white font-semibold p-3 text-lg rounded-lg active:bg-green-700 mt-4">
          Make Payment
        </button> */}
        <button
          onClick={() => setCancelRidePanel(true)}
          className="w-full bg-red-600 text-white font-semibold p-3 text-lg rounded-lg active:bg-red-700"
        >
          End Ride
        </button>
      </div>
  )
}

export default UserRidingPanel
