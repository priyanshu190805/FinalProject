import React from 'react'

const PaymentPage = ({ride}) => {
    return (
        <div >
        <div 
          className="p-1 w-[100%] top-0 flex items-center justify-center"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </div>
    
        <h3 className="text-2xl font-semibold mt-2 mb-6">
          Finish this Ride
        </h3>
    
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
        </div>
      </div>
      )
}

export default PaymentPage
