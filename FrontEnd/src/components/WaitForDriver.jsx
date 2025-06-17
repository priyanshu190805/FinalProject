import React from "react";

const WaitForDriver = ({
  ride,
  darkMode,
  selectedVehicleImage,
  setCancelRidePanel,
}) => {
  return (
    <div className={`mt-8 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="flex items-center justify-between px-2 pb-4 border-b-2 border-[#eee]">
        <img
          src={ride?.captain?.profilePhoto || "/default-avatar.png"}
          alt="Captain DP"
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
        />
        <div className="text-right">
          <h2 className=" text-[19px] font-medium capitalize">{`${
            ride?.captain?.fullname?.firstname ?? "Unknown"
          } ${ride?.user?.fullname?.lastname ?? "User"}`}</h2>
          <div className="flex gap-3">
            <div className="flex items-center">
              <img className="h-12" src={selectedVehicleImage} alt="" />
            </div>
            <div>
              <h4 className="text-[21px] font-semibold -mb-1 -mt-1">
                {ride?.captain?.vehicle?.plate}
              </h4>
              <p
                className={`${
                  darkMode ? "text-[#757575]" : "text-gray-500"
                } font-medium`}
              >{`${ride?.captain?.vehicle?.company} ${ride?.captain?.vehicle?.model}`}</p>
              <h1 className="text-lg font-semibold">{ride?.otp}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <div className="w-full">
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
            <i className="text-xl ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
            <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">{ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{ride?.fare}</h3>
              <p className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}>
                {ride?.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setCancelRidePanel(true);
        }}
        className="w-full bg-red-600 text-white text-lg font-semibold p-3 rounded-lg active:bg-red-700"
      >
        Cancel
      </button>
    </div>
  );
};

export default WaitForDriver;
