import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FinishRide = ({setFinishRidePanel, ride, darkMode}) => {

  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId : ride._id
    }, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status === 200){
      setFinishRidePanel(false)
      navigate('/captain-start')
    }
  }
  
  return (
    <div >
    <div onClick={() => {setFinishRidePanel(false)}}
      className="p-1 w-[100%] top-0 flex items-center justify-center"
    >
      <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
    </div>

    <h3 className="text-2xl font-semibold mt-2 mb-6">
      Finish this Ride
    </h3>

    <div className="flex items-center justify-between my-6 p-4 border-yellow-400 border-[3px] rounded-lg">
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
      <h5 className="text-[19px] font-semibold">{ride?.distance} km</h5>
    </div>

    <div className="flex justify-between items-center w-full gap-2 flex-col">
      <div className="w-full">
        {/* <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
          <i className="text-xl ri-map-pin-fill"></i>
          <div className="">
            <h3 className="text-lg font-medium">{ride?.pickup}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
          <i className="ri-map-pin-line text-xl"></i>
          <div className="">
            <h3 className="text-lg font-medium">{ride?.destination}</h3>
          </div>
        </div> */}
        <div className="flex items-center justify-center w-full gap-3 p-2 border-[#eee] mb-3 rounded-lg">
          {/* <i className="ri-money-rupee-circle-fill text-xl"></i> */}
          <div className="">
            <h3 className="text-[40px] font-medium">&#8377;{ride?.fare}</h3>
          </div>
        </div>
      </div>
      <button onClick={endRide} className="w-full flex items-center justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg active:bg-green-700">
       Payment Recieved
      </button>           
    </div>
  </div>
  )
}

export default FinishRide
