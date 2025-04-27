import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const ConfirmRidePopup = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride,
}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axiosCaptainInstance.get("/rides/start-ride",{
        params : {
          rideId: ride._id,
          otp: otp,
        },
      },
    );

    if(response.status === 200){
      setConfirmRidePopupPanel(false)
      setRidePopupPanel(false)
      navigate("/captain-riding", {state : {ride : ride}})
    }
  };

  return (
    <div className="">
      <div
        onClick={() => {
          setConfirmRidePopupPanel(false);
        }}
        className="p-1 w-[100%] top-0 flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div>

      <h3 className="text-2xl font-semibold mt-2 mb-6">
        Confirm this ride to start
      </h3>

      <div className="flex items-center justify-between my-6 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg"
            alt=""
          />
          <h2 className="font-medium text-[19px] capitalize">{`${
            ride?.user?.fullname?.firstname ?? "Unknown"
          } ${ride?.user?.fullname?.lastname ?? "User"}`}</h2>
        </div>
        <h5 className="text-[19px] font-semibold">2.2 Km</h5>
      </div>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <div className="w-full">
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="text-xl ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-xl font-medium">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-map-pin-line text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">{ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{ride?.fare}</h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <form className="w-full" onSubmit={submitHandler}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            placeholder="Enter OTP"
            className="px-6 py-4 font-mono text-[19px] bg-[#eee] rounded-lg w-full my-10"
          />
          <button
            to="/captain-riding"
            className="w-full flex items-center  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg active:bg-green-700"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirmRidePopupPanel(false);
              setRidePopupPanel(false);
            }}
            className="w-full mt-3 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg active:bg-red-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
