import React from 'react'

const WaitForDriver = ({setWaitForDriverPanelOpen, ride}) => {
  return (
    <div>
    <div onClick={() => {setWaitForDriverPanelOpen(false)}} className="p-1 w-[100%] top-0 flex items-center justify-center">
      <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
    </div>

    <div className='flex items-center justify-between px-2 pb-4 border-b-2 border-[#eee]'>
    <img
        className="h-12"
        src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-st-yellow-carcarvehicletransportford-961524664016apjao.png"
        alt=""
      />
      <div className='text-right'>
        <h2 className='text-[19px] font-medium capitalize'>{`${ride?.captain?.fullname?.firstname ?? "Unknown"} ${ride?.user?.fullname?.lastname ?? "User"}`}</h2>
        <h4 className='text-[21px] font-semibold -mb-1 -mt-1'>{ride?.captain.vehicle.plate}</h4>
        <p className='text-gray-500 font-medium'>Maruti Suzuki Baleno</p>
        <h1 className='text-lg font-semibold'>{ride?.otp}</h1>
      </div>
    </div>

    <div className="flex justify-between items-center w-full gap-2 flex-col">
      
      <div className="w-full">
        <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
          <i className="text-xl ri-map-pin-fill"></i>
          <div className="">
            <h3 className="text-xl font-medium">{ride?.pickup}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2">
        <i className="ri-map-pin-line text-xl"></i>
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
  </div>
  )
}

export default WaitForDriver
