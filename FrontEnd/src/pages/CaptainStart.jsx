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
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
import CaptainSettings from "../components/CaptainSettings";
import ChangeCaptainDp from "../components/ChangeCaptainDp";
import { ThemeDataContext } from "../context/ThemeContext";
import ChangeCaptainUsername from "../components/ChangeCaptainUsername";

const CaptainStart = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [captainSettingOpen, setCaptainSettingOpen] = useState(false);
  const [captainDpPanel, setCaptainDpPanel] = useState(false);
  const [changeCaptainNamePanel, setChangeCaptainNamePanel] = useState(false);
  const [ride, setRide] = useState(false);

  const ridePopupPanelRef = useRef(false);
  const confirmRidePopupPanelRef = useRef(false);
  const captainSettingRef = useRef(false);
  const changeCaptainNameRef = useRef(false);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);
  const {darkMode, setDarkMode} = useContext(ThemeDataContext)

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
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captain: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
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


  return (
    <div className="h-screen flex flex-col relative">
      <div className="fixed p-7 top-0 flex  justify-between w-full z-10">
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
        }}
        className="absolute w-10 h-10 mb-10 top-7 right-7 bg-black flex justify-center items-center rounded-full"
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
        <CaptainSettings setChangeCaptainNamePanel={setChangeCaptainNamePanel} darkMode={darkMode} setDarkMode={setDarkMode} setCaptainDpPanel={setCaptainDpPanel} captain={captain} />
      </div>

      <div className={`${captainDpPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${darkMode ? "bg-white/5" :"bg-gray-300/50"} w-full pb-6`}>
        <ChangeCaptainDp darkMode={darkMode} captain={captain} setCaptainDpPanel={setCaptainDpPanel}/>
      </div>

      <div ref={changeCaptainNameRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
        <ChangeCaptainUsername setChangeCaptainNamePanel={setChangeCaptainNamePanel} darkMode={darkMode} />
      </div>

      <div className="flex flex-col p-6 overflow-hidden">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6"
      >
        <RidePopup
          confirmRide={confirmRide}
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="h-screen translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6"
      >
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainStart;
