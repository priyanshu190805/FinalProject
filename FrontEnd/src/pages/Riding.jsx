import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const { ride } = location.state || {};
  const {socket} = useContext(SocketDataContext)
  const navigate = useNavigate()

  socket.on('ride-ended', () => {
    navigate('/start')
  })

  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/start"
        className="w-10 h-10 fixed right-3 top-3 bg-white flex justify-center items-center rounded-full"
      >
        <i className="ri-home-4-line text-xl font-semibold"></i>
      </Link>

      <div className="flex-grow min-h-0">
       <LiveTracking/>
      </div>

      <div className="flex flex-col p-4 overflow-hidden">
        <div className="flex items-center justify-between px-2 pb-4 border-b-2 border-[#eee]">
          <img
            className="h-12"
            src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-st-yellow-carcarvehicletransportford-961524664016apjao.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-[19px] font-medium">{`${
              ride?.captain?.fullname?.firstname ?? "Unknown"
            } ${ride?.user?.fullname?.lastname ?? "User"}`}</h2>
            <h4 className="text-[21px] font-semibold -mb-1 -mt-1">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-gray-500 font-medium">Maruti Suzuki Baleno</p>
          </div>
        </div>

        <div className=" flex justify-between items-center w-full gap-2 flex-col">
          <div className="w-full">
            <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
              <i className="text-xl ri-map-pin-fill"></i>
              <div className="">
                <h3 className="text-xl font-medium">{ride?.destination}</h3>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-[#eee] mb-2">
              <i className="ri-money-rupee-circle-fill text-xl"></i>
              <div className="">
                <h3 className="text-xl font-medium">&#8377;{ride?.fare}</h3>
                <p className="text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-3 text-lg rounded-lg b-0 active:bg-green-700 bottom-0">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
