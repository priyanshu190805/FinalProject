import React, { useContext, useEffect, useRef, useState } from "react";
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
import CancelRideByCaptain from "../components/CancelRideByCaptain";

const CaptainStart = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [captainSettingOpen, setCaptainSettingOpen] = useState(false);
  const [captainDpPanel, setCaptainDpPanel] = useState(false);
  const [changeCaptainNamePanel, setChangeCaptainNamePanel] = useState(false);
  const [changeCaptainPasswordPanel, setChangeCaptainPasswordPanel] =
    useState(false);
  const [vehicleDetailsPanel, setVehicleDetailsPanel] = useState(false);
  const [ride, setRide] = useState(false);
  const [logoutPanel, setLogoutPanel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [cancelRideByCaptainPanel, setCancelRideByCaptainPanel] =
    useState(false);
  const [otp, setOtp] = useState("");

  const ridePopupPanelRef = useRef(false);
  const confirmRidePopupPanelRef = useRef(false);
  const captainSettingRef = useRef(false);
  const changeCaptainNameRef = useRef(false);
  const changeCaptainPasswordRef = useRef(false);
  const vehicleDetailsRef = useRef(false);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);
  const { darkMode, setDarkMode } = useContext(ThemeDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);

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

  socket.on("user-cancelled-ride", (data) => {
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(false);
    setOtp("");
    showPopup("Ride cancelled by user", "failed");
  });

  async function confirmRide() {
    try {
      const response = await axiosCaptainInstance.post("/rides/confirm", {
        rideId: ride._id,
        captain: captain._id,
      });

      if (response.status === 200) {
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
        setEditing(true);
      }
    } catch (error) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanel]);

  useGSAP(() => {
    gsap.to(captainSettingRef.current, {
      transform: captainSettingOpen ? "translateX(0)" : "translateX(100%)",
    });
  }, [captainSettingOpen]);

  useGSAP(() => {
    gsap.to(changeCaptainNameRef.current, {
      transform: changeCaptainNamePanel ? "translateX(0)" : "translateX(100%)",
    });
  }, [changeCaptainNamePanel]);

  useGSAP(() => {
    gsap.to(changeCaptainPasswordRef.current, {
      transform: changeCaptainPasswordPanel
        ? "translateX(0)"
        : "translateX(100%)",
    });
  }, [changeCaptainPasswordPanel]);

  useGSAP(() => {
    gsap.to(vehicleDetailsRef.current, {
      transform: vehicleDetailsPanel ? "translateX(0)" : "translateX(100%)",
    });
  }, [vehicleDetailsPanel]);

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      {popupMessage && (
        <div
          className={`absolute top-0 left-0 w-full ${
            popupStatus === "success" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 text-sm text-center z-50`}
        >
          {popupMessage}
        </div>
      )}

      <div className="fixed px-7 top-8 flex justify-between w-full z-10">
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

          if (captainSettingOpen && captainDpPanel) {
            setCaptainSettingOpen(true);
            setCaptainDpPanel(false);
          }
          if (captainSettingOpen && changeCaptainNamePanel) {
            setCaptainSettingOpen(true);
            setChangeCaptainNamePanel(false);
          }
          if (captainSettingOpen && changeCaptainPasswordPanel) {
            setCaptainSettingOpen(true);
            setChangeCaptainPasswordPanel(false);
          }
          if (captainSettingOpen && vehicleDetailsPanel) {
            setCaptainSettingOpen(true);
            setVehicleDetailsPanel(false);
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

      <div className="flex-grow min-h-0 overflow-y-auto">
        <LiveTracking />
      </div>

      <div
        ref={captainSettingRef}
        className="translate-x-full fixed z-20 left-0 h-full bg-white w-full overflow-y-auto"
      >
        <CaptainSettings
          {...{
            editing,
            setLogoutPanel,
            setVehicleDetailsPanel,
            setChangeCaptainPasswordPanel,
            setChangeCaptainNamePanel,
            darkMode,
            setDarkMode,
            setCaptainDpPanel,
            captain,
          }}
        />
      </div>

      {captainDpPanel && (
        <div
          className="fixed z-30 left-0 h-full w-full overflow-y-auto"
          style={{
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(209,213,219,0.5)",
          }}
        >
          <ChangeCaptainDp
            {...{ showPopup, darkMode, captain, setCaptainDpPanel }}
          />
        </div>
      )}

      {logoutPanel && (
        <div
          className="fixed z-30 left-0 h-full w-full overflow-y-auto"
          style={{
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(209,213,219,0.5)",
          }}
        >
          <CaptainLogoutPanel {...{ setLogoutPanel, showPopup, darkMode }} />
        </div>
      )}

      <div
        ref={changeCaptainNameRef}
        className="translate-x-full fixed z-30 left-0 h-full bg-white w-full overflow-y-auto"
      >
        <ChangeCaptainUsername
          {...{ showPopup, setChangeCaptainNamePanel, darkMode }}
        />
      </div>

      <div
        ref={changeCaptainPasswordRef}
        className="translate-x-full fixed z-30 left-0 h-full bg-white w-full overflow-y-auto"
      >
        <ChangeCaptainPassword
          {...{ showPopup, darkMode, setChangeCaptainPasswordPanel }}
        />
      </div>

      <div
        ref={vehicleDetailsRef}
        className="translate-x-full fixed z-30 left-0 h-full bg-white w-full overflow-y-auto"
      >
        <ChangeVehicleDetails
          {...{ showPopup, darkMode, setVehicleDetailsPanel }}
        />
      </div>

      <div
        className={`flex flex-col p-6 overflow-hidden ${
          darkMode ? "bg-[#1b1b1b] text-white" : "bg-white"
        }`}
      >
        <CaptainDetails darkMode={darkMode} />
      </div>

      {cancelRideByCaptainPanel && (
        <div
          className="fixed z-30 left-0 h-full w-full pb-6 overflow-y-auto"
          style={{
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(209,213,219,0.5)",
          }}
        >
          <CancelRideByCaptain
            {...{
              ride,
              setConfirmRidePopupPanel,
              setRidePopupPanel,
              setEditing,
              setCancelRideByCaptainPanel,
              showPopup,
              darkMode,
            }}
          />
        </div>
      )}

      <div
        ref={ridePopupPanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white"
        } w-full px-3 pb-6`}
      >
        <RidePopup
          {...{
            darkMode,
            confirmRide,
            ride,
            setRidePopupPanel,
            setConfirmRidePopupPanel,
          }}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className={`h-screen translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white"
        } w-full px-3 pb-6`}
      >
        <ConfirmRidePopup
          {...{
            otp,
            setOtp,
            showPopup,
            setCancelRideByCaptainPanel,
            darkMode,
            ride,
            setConfirmRidePopupPanel,
            setRidePopupPanel,
          }}
        />
      </div>
    </div>
  );
};

export default CaptainStart;
