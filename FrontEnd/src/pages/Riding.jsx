import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import { useGSAP } from "@gsap/react";
import Settings from "../components/Settings";
import gsap from "gsap";
import { UserDataContext } from "../context/UserContext";
import { ThemeDataContext } from "../context/ThemeContext";
import CancelRidePanel from "../components/CancelRidePanel";
import { PopupDataContext } from "../context/PopupContext";
import PaymentPage from "../components/PaymentPage";
import UserRidingPanel from "../components/UserRidingPanel";

const Riding = () => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [cancelRidePanel, setCancelRidePanel] = useState(false);
  const [userRidingPanelOpen, setUserRidingPanelOpen] = useState(true);
  const [paymentPanelOpen, setPaymentPanelOpen] = useState(false);
  const [editing, setEditing] = useState(true);
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();
  const settingRef = useRef();
  const userRidingRef = useRef();
  const paymentPanelRef = useRef();
  const { user } = useContext(UserDataContext);
  const { darkMode } = useContext(ThemeDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);

  socket.on("ride-ended", () => {
    navigate("/start");
  });

  socket.on("make-payment", () => {
    showPopup("Make payment", "success")
  });

  useGSAP(() => {
    if (settingOpen) {
      gsap.to(settingRef.current, {
        transform: "translateX(0)",
      });
    } else {
      gsap.to(settingRef.current, {
        transform: "translateX(100%)",
      });
    }
  }, [settingOpen]);

  useGSAP(() => {
    if (userRidingPanelOpen) {
      gsap.to(userRidingRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(userRidingRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [userRidingPanelOpen]);

  useGSAP(() => {
    if (paymentPanelOpen) {
      gsap.to(paymentPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(paymentPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [paymentPanelOpen]);

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-[#1b1b1b] text-white" : "bg-white"
      }`}
    >
      <div className="flex-grow min-h-0">
        <LiveTracking />
        {popupMessage && (
        <div
          className={`absolute top-0 left-0 w-full ${
            popupStatus === "success" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 text-sm text-center z-50`}
        >
          {popupMessage}
        </div>
      )}
      </div>

      <button
        style={{ zIndex: 9999 }}
        onClick={() => setSettingOpen(!settingOpen)}
        className="absolute w-10 h-10 mb-10 top-8 right-7 bg-black flex justify-center items-center rounded-full"
      >
        <i
          className={`text-xl font-semibold text-white ${
            settingOpen ? "ri-arrow-left-line" : "ri-menu-line"
          }`}
        ></i>
      </button>

      <div
        ref={settingRef}
        className="translate-x-full fixed z-20 left-0 h-full bg-white w-full pb-6"
      >
        <Settings editing={editing} user={ride?.user} />
      </div>

      <div
        className={`${
          cancelRidePanel ? "" : "hidden"
        } fixed z-30 left-0 h-full ${
          darkMode ? "bg-white/5" : "bg-gray-300/50"
        } w-full pb-6`}
      >
        <CancelRidePanel ride={ride} showPopup={showPopup} setCancelRidePanel={setCancelRidePanel} isFromRidingPage={true}/>
      </div>

      <div ref={paymentPanelRef} className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full px-3 pb-6`}>
       <PaymentPage  ride={ride}/>
      </div>

      <div ref={userRidingRef} className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full`}>
      <UserRidingPanel ride={ride} setCancelRidePanel={setCancelRidePanel} darkMode={darkMode}/>
      </div>
    </div>
  );
};

export default Riding;
