import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import captainLogo from "../assets/captainLogo.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import CaptainSettings from "../components/CaptainSettings";
import ChangeCaptainDp from "../components/ChangeCaptainDp";
import { ThemeDataContext } from "../context/ThemeContext";
import ChangeCaptainUsername from "../components/ChangeCaptainUsername";
import ChangeCaptainPassword from "../components/ChangeCaptainPassword";
import ChangeVehicleDetails from "../components/ChangeVehicleDetails";
import { PopupDataContext } from "../context/PopupContext";
import CaptainLogoutPanel from "../components/CaptainLogoutPanel";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";
import CancelRidePanel from "../components/CancelRidePanel";
import CancelRideByCaptain from "../components/CancelRideByCaptain";

const CaptainStart = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [captainSettingOpen, setCaptainSettingOpen] = useState(false);
  const [captainDpPanel, setCaptainDpPanel] = useState(false);
  const [changeCaptainNamePanel, setChangeCaptainNamePanel] = useState(false);
  const [changeCaptainPasswordPanel, setChangeCaptainPasswordPanel] = useState(false);
  const [vehicleDetailsPanel, setVehicleDetailsPanel] = useState(false);
  const [ride, setRide] = useState(false);
   const [logoutPanel, setLogoutPanel] = useState(false);
   const [editing, setEditing] = useState(false);
   const [cancelRideByCaptainPanel, setCancelRideByCaptainPanel] = useState(false);
   const [otp, setOtp] = useState("");

  const ridePopupPanelRef = useRef(false);
  const confirmRidePopupPanelRef = useRef(false);
  const captainSettingRef = useRef(false);
  const changeCaptainNameRef = useRef(false);
  const changeCaptainPasswordRef = useRef(false);
  const vehicleDetailsRef = useRef(false);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);
  console.log(captain)
  const {darkMode, setDarkMode} = useContext(ThemeDataContext)
  const {popupMessage ,popupStatus ,showPopup} = useContext(PopupDataContext)

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  socket.on('user-cancelled-ride', (data) => {
    console.log("ride cancelled")
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(false)
    setOtp("")
    showPopup("Ride cancelled by user", "failed")
  })

  async function confirmRide() {
    try {
      const response = await axiosCaptainInstance.post("/rides/confirm",
        {
          rideId: ride._id,
          captain: captain._id,
        },
        {
          withCredentials: true,
        }                                               
      );

      if(response.status === 200){
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
        setEditing(true)
      }
    } catch (error) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
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

  useGSAP(
    function(){
      if(changeCaptainNamePanel){
        gsap.to(changeCaptainNameRef.current, {
          transform : 'translateX(0)'
        })
      }
      else {
        gsap.to(changeCaptainNameRef.current, {
          transform : 'translateX(100%)'
        })
      }
    },[changeCaptainNamePanel]
  )

  useGSAP(
    function(){
      if(changeCaptainPasswordPanel){
        gsap.to(changeCaptainPasswordRef.current, {
          transform : 'translateX(0)'
        })
      }
      else {
        gsap.to(changeCaptainPasswordRef.current, {
          transform : 'translateX(100%)'
        })
      }
    },[changeCaptainPasswordPanel]
  )

  useGSAP(
    function(){
      if(vehicleDetailsPanel){
        gsap.to(vehicleDetailsRef.current, {
          transform : 'translateX(0)'
        })
      }
      else {
        gsap.to(vehicleDetailsRef.current, {
          transform : 'translateX(100%)'
        })
      }
    },[vehicleDetailsPanel]
  )


  return (
    <div className="h-screen flex flex-col relative">
      {popupMessage && (
        <div className={`absolute top-0 left-0 w-full ${popupStatus === 'success' ? "bg-green-500" : "bg-red-500"} text-white py-1 text-sm text-center z-50`}>
          {popupMessage}
        </div>
      )}
      <div className="fixed px-7 top-8 flex  justify-between w-full z-10">
        <img src={captainLogo} className="w-16 rounded-xl mb-10 object-cover" />
      </div>

      <button
        style={{ zIndex: 9999 }}
        onClick={() => {
          if (!captainSettingOpen) {
            setCaptainSettingOpen(true);
          } else {
            setCaptainSettingOpen(false);
          }

          if(captainSettingOpen && captainDpPanel){
            setCaptainSettingOpen(true)
            setCaptainDpPanel(false)
          }

          if(captainSettingOpen && changeCaptainNamePanel){
            setCaptainSettingOpen(true)
            setChangeCaptainNamePanel(false)
          }

          if(captainSettingOpen && changeCaptainPasswordPanel){
            setCaptainSettingOpen(true)
            setChangeCaptainPasswordPanel(false)
          }

          if(captainSettingOpen && vehicleDetailsPanel){
            setCaptainSettingOpen(true)
            setVehicleDetailsPanel(false)
          }
        }}
        className="absolute w-10 h-10 mb-10 top-8 right-7 bg-black flex justify-center items-center rounded-full"
      >
        <i
          className={`text-xl font-semibold text-white ${
            captainSettingOpen ? "ri-arrow-left-line" : "ri-menu-line"
          }`}
        ></i>
      </button>

      <div className="flex-grow min-h-0">
        <LiveTracking />
      </div>

      <div
        ref={captainSettingRef}
        className="translate-x-full fixed z-20 left-0 h-full bg-white w-full pb-6"
      >
        <CaptainSettings editing={editing} setLogoutPanel={setLogoutPanel} setVehicleDetailsPanel={setVehicleDetailsPanel} setChangeCaptainPasswordPanel={setChangeCaptainPasswordPanel} setChangeCaptainNamePanel={setChangeCaptainNamePanel} darkMode={darkMode} setDarkMode={setDarkMode} setCaptainDpPanel={setCaptainDpPanel} captain={captain} />
      </div>

      <div className={`${captainDpPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${darkMode ? "bg-white/5" :"bg-gray-300/50"} w-full pb-6`}>
        <ChangeCaptainDp showPopup={showPopup} darkMode={darkMode} captain={captain} setCaptainDpPanel={setCaptainDpPanel}/>
      </div>

      <div className={`${logoutPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${darkMode ? "bg-white/5" :"bg-gray-300/50"} w-full pb-6`}>
          <CaptainLogoutPanel setLogoutPanel={setLogoutPanel} showPopup={showPopup} darkMode={darkMode}/>
      </div>

      <div ref={changeCaptainNameRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
        <ChangeCaptainUsername showPopup={showPopup} setChangeCaptainNamePanel={setChangeCaptainNamePanel} darkMode={darkMode} />
      </div>

      <div ref={changeCaptainPasswordRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
          <ChangeCaptainPassword showPopup={showPopup} darkMode={darkMode} setChangeCaptainPasswordPanel={setChangeCaptainPasswordPanel}/>
      </div>

      <div ref={vehicleDetailsRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
          <ChangeVehicleDetails showPopup={showPopup} darkMode={darkMode} setVehicleDetailsPanel={setVehicleDetailsPanel}/>
      </div>

      <div className={`flex flex-col p-6 overflow-hidden ${darkMode ? "bg-[#1b1b1b] text-white" : "bg-white"}`}>
        <CaptainDetails darkMode={darkMode}/>
      </div>

      <div
          className={`${cancelRideByCaptainPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${
            darkMode ? "bg-white/5" : "bg-gray-300/50"
          } w-full pb-6`}
        >
          <CancelRideByCaptain
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
            setEditing={setEditing}
            setCancelRideByCaptainPanel={setCancelRideByCaptainPanel}
            showPopup={showPopup}
            darkMode={darkMode}
          />
        </div>

      <div
        ref={ridePopupPanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${darkMode? "bg-[#1B1B1B] text-white" : "bg-white"} w-full px-3 pb-6`}
      >
        <RidePopup
        darkMode={darkMode}
          confirmRide={confirmRide}
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className={`h-screen translate-y-full fixed z-10 bottom-0 ${darkMode? "bg-[#1B1B1B] text-white" : "bg-white"} w-full px-3 pb-6`}
      >
        <ConfirmRidePopup
        otp={otp}
        setOtp={setOtp}
        showPopup={showPopup}
        setCancelRideByCaptainPanel={setCancelRideByCaptainPanel}
        darkMode={darkMode}
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainStart;
