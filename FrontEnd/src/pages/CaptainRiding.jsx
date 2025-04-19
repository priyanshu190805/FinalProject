import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import captainLogo from "../assets/captainLogo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    console.log(rideData)

    useGSAP(
        function(){
            if(finishRidePanel){
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(0)'
                })
            }
            else{
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        },[finishRidePanel]
    )

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed p-7 top-0 flex  justify-between w-full">
        <img src={captainLogo} className="w-16 rounded-xl mb-10" />
        <Link
          to="/start"
          className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
        >
          <i className="ri-logout-box-r-line text-xl font-semibold"></i>
        </Link>
      </div>

      <div className="flex-grow min-h-0">
        <LiveTracking />
      </div>

      <div className=" overflow-hidden">
      {/* <div
        className="pt-1 w-[100%] top-0 flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </div> */}
        <div className="flex items-center justify-between p-6">
          <h4 className="text-[21px] font-semibold">4 Km away</h4>
          <button onClick={() => {setFinishRidePanel(true)}} className="flex text-lg items-center justify-center bg-green-600 text-white font-semibold py-3 px-12 rounded-lg active:bg-green-700">
            Complete ride
          </button>
        </div>
      </div>

      <div ref={finishRidePanelRef} className="translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6">
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
