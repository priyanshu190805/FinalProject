import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import captainLogo from "../assets/captainLogo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";
import { ThemeDataContext } from "../context/ThemeContext";
import CaptainSettings from "../components/CaptainSettings";
import { CaptainDataContext } from "../context/CaptainContext";
import SocketContext, { SocketDataContext } from "../context/SocketContext";
import { PopupDataContext } from "../context/PopupContext";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [captainSettingOpen, setCaptainSettingOpen] = useState(false);
  const [editing, setEditing] = useState(true);
  const finishRidePanelRef = useRef(null);
  const captainSettingRef = useRef(null);
  const location = useLocation();
  const ride = location.state?.ride;
  const { darkMode, setDarkMode } = useContext(ThemeDataContext);
  const { captain } = useContext(CaptainDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);
  const navigate = useNavigate()

  const { socket } = useContext(SocketDataContext)

  socket.on('user-cancelled-ride', (data) => {
    navigate('/captain-start')
    showPopup("Ride cancelled by user", "failed")
  })

  async function paymentPage () {
    try {
      const response = await axiosCaptainInstance.post("/rides/payment", {
        rideId : ride?._id
      })

      console.log(response.status)

      if(response.status === 200){
        setFinishRidePanel(true)
      }
    } catch (error) {
      
    }
  }


  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  useGSAP(
    function () {
      if (captainSettingOpen)
        gsap.to(captainSettingRef.current, {
          transform: "translateX(0)",
        });
      else {
        gsap.to(captainSettingRef.current, {
          transform: "translateX(100%)",
        });
      }
    },
    [captainSettingOpen]
  );


  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-[#1b1b1b] text-white" : "bg-white"}`}>
      <div className="fixed p-7 top-0 flex  justify-between w-full">
        <img src={captainLogo} className="w-16 rounded-xl mb-10" />
      </div>

      <div className="flex-grow min-h-0">
        <LiveTracking />
      </div>

      <button
        style={{ zIndex: 9999 }}
        onClick={() => {
          if (!captainSettingOpen) {
            setCaptainSettingOpen(true);
          } else {
            setCaptainSettingOpen(false);
          }

          // if (settingOpen && changePasswordPanel) {
          //   setSettingOpen(true);
          //   setChangePasswordPanel(false);
          // }

          // if (settingOpen && changeUsernamePanel) {
          //   setSettingOpen(true);
          //   setChangeUsernamePanel(false);
          // }

          // if (settingOpen && changeDpPanel) {
          //   setSettingOpen(true);
          //   setChangeDpPanel(false);
          // }

          // if (settingOpen && logoutPanel) {
          //   setSettingOpen(true);
          //   setLogoutPanel(false);
          // }
        }}
        className="hello absolute w-10 h-10 mb-10 top-8 right-7 bg-black flex justify-center items-center rounded-full"
      >
        <i
          className={`text-xl font-semibold text-white ${
            captainSettingOpen ? "ri-arrow-left-line" : "ri-menu-line"
          }`}
        ></i>
      </button>

      <div
        ref={captainSettingRef}
        className="translate-x-full fixed z-20 left-0 h-full bg-white w-full pb-6"
      >
        <CaptainSettings
          editing={editing}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          captain={captain}
        />
      </div>

      <div className="p-4">

      <div className="flex items-center justify-between my-6 px-6 py-3 bg-yellow-500 rounded-lg">
          <h2 className="font-medium text-[19px] capitalize text-black">
          {`${ride?.user?.fullname?.firstname ?? "Unknown"} ${ride?.user?.fullname?.lastname ?? "User"}`}
          </h2>
        <h5 className="text-[19px] font-semibold text-black">{ride?.distance} Km</h5>
      </div>

      <div className="flex justify-between items-center w-full gap-2 flex-col">
        <div className="w-full">
          <div className="flex items-center gap-3 p-2 border-b-2 border-[#eee] mb-2 rounded-lg">
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
          </div>
          <div className="flex items-center gap-3 p-2 border-[#eee] mb-2 rounded-lg">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className="text-xl font-medium">&#8377;{ride.fare}</h3>
              <p className={`${darkMode ? "text-[#757575]" : "text-gray-500"}`}>{ride?.paymentMethod}</p>
            </div>
          </div>
        </div>
        <button onClick={paymentPage}
          className="w-full bg-green-600 text-white font-semibold text-lg p-3 rounded-lg active:bg-green-700 mb-1"
        >
          Finish Ride
        </button>
      </div>
    </div>

      <div
        ref={finishRidePanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${darkMode ? "bg-[#1b1b1b]" : "bg-white"} w-full px-3 pb-6`}
      >
        <FinishRide
        darkMode={darkMode}
          ride={ride}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
