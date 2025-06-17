import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";
import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword";
import ChangeUsername from "../components/ChangeUsername";
import { ThemeDataContext } from "../context/ThemeContext";
import ChangeDp from "../components/ChangeDp";
import { PopupDataContext } from "../context/PopupContext";
import LogoutPanel from "../components/LogoutPanel";
import axiosInstance from "../Utils/axiosInstance";
import CancelRidePanel from "../components/CancelRidePanel";

const Start = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [waitForDriverPanelOpen, setWaitForDriverPanelOpen] = useState(false);
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] =
    useState(false);
  const [changePasswordPanel, setChangePasswordPanel] = useState(false);
  const [changeUsernamePanel, setChangeUsernamePanel] = useState(false);
  const [changeDpPanel, setChangeDpPanel] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [selectedVehicleImage, setSelectedVehicleImage] = useState({});
  const [logoutPanel, setLogoutPanel] = useState(false);
  const [cancelRidePanel, setCancelRidePanel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const settingRef = useRef(null);
  const changePasswordRef = useRef(null);
  const changeUsernameRef = useRef(null);

  const { socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);
  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setVehiclePanelOpen(false);
    setLookingForDriverPanelOpen(false);
    setWaitForDriverPanelOpen(true);
  });

  socket.on("ride-started", (ride) => {
    console.log("Ride started");
    setWaitForDriverPanelOpen(false);
    navigate("/riding", { state: { ride } });
  });

  socket.on("ride-cancelled-by-captain", (data) => {
    console.log("ride is cancelled");
    setWaitForDriverPanelOpen(false);
    showPopup("Ride cancelled by Captain", "failed");
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    const response = await axiosInstance.get("/maps/get-suggestions", {
      params: { input: e.target.value },
    });
    setPickupSuggestions(response.data);
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    const response = await axiosInstance.get("/maps/get-suggestions", {
      params: { input: e.target.value },
    });

    setDestinationSuggestions(response.data);
  };

  async function findTrip() {
    try {
      const response = await axiosInstance.get("/rides/get-fare", {
        params: {
          pickup: pickup,
          destination: destination,
        },
      });
      console.log(response.data);

      setFare(response.data);

      setVehiclePanelOpen(true);
      setPanelOpen(false);
    } catch (error) {
      showPopup("No routes found");
    }
  }

  async function createRide() {
    try {
<<<<<<< HEAD
      console.log(pickup, destination, vehicleType, paymentMethod)
      const response = await axiosInstance.post("/rides/create", {
        pickup,
        destination,
        vehicleType,
        paymentMethod,
      },
      {
       withCredentials: true,
      });
=======
      console.log(pickup, destination, vehicleType, paymentMethod);
      const response = await axiosInstance.post(
        "/rides/create",
        {
          pickup,
          destination,
          vehicleType,
          paymentMethod,
        },
        {
          withCredentials: true,
        }
      );
>>>>>>> c141779 (favicon updated)

      if (response.status === 200) {
        const rideWithUser = response.data;

        setRide(rideWithUser);
        setConfirmRidePanelOpen(false);
        setLookingForDriverPanelOpen(true);
        setEditing(true);
      }
    } catch (error) {
      showPopup("Something went wrong. Please try again later.", "failed");
    }
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (lookingForDriverPanelOpen) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverPanelOpen]
  );

  useGSAP(
    function () {
      if (waitForDriverPanelOpen) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitForDriverPanelOpen]
  );

  useGSAP(
    function () {
      if (settingOpen) {
        gsap.to(settingRef.current, {
          transform: "translateX(0)",
        });
      } else {
        gsap.to(settingRef.current, {
          transform: "translateX(100%)",
        });
      }
    },
    [settingOpen]
  );

  useGSAP(
    function () {
      if (changePasswordPanel) {
        gsap.to(changePasswordRef.current, {
          transform: "translateX(0)",
        });
      } else {
        gsap.to(changePasswordRef.current, {
          transform: "translateX(100%)",
        });
      }
    },
    [changePasswordPanel]
  );

  useGSAP(
    function () {
      if (changeUsernamePanel) {
        gsap.to(changeUsernameRef.current, {
          transform: "translateX(0)",
        });
      } else {
        gsap.to(changeUsernameRef.current, {
          transform: "translateX(100%)",
        });
      }
    },
    [changeUsernamePanel]
  );

  return (
    <div className="h-screen relative overflow-hidden">
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
      <div className="">
        <img
          src={Logo}
          className="w-16 absolute rounded-xl mb-10 top-8 left-7"
        />
        <button
          style={{ zIndex: 9999 }}
          onClick={() => {
            if (!settingOpen) {
              setSettingOpen(true);
            } else {
              setSettingOpen(false);
            }

            if (settingOpen && changePasswordPanel) {
              setSettingOpen(true);
              setChangePasswordPanel(false);
            }

            if (settingOpen && changeUsernamePanel) {
              setSettingOpen(true);
              setChangeUsernamePanel(false);
            }

            if (settingOpen && changeDpPanel) {
              setSettingOpen(true);
              setChangeDpPanel(false);
            }

            if (settingOpen && logoutPanel) {
              setSettingOpen(true);
              setLogoutPanel(false);
            }
          }}
          className="hello absolute w-10 h-10 mb-10 top-8 right-7 bg-black flex justify-center items-center rounded-full"
        >
          <i
            className={`text-xl font-semibold text-white ${
              settingOpen ? "ri-arrow-left-line" : "ri-menu-line"
            }`}
          ></i>
        </button>
      </div>
      <div className="absolute w-full h-screen top-0 flex flex-col justify-end">
        <div
          className={`home px-6 pt-5 pb-10 ${
            darkMode ? "bg-[#1B1B1B] text-white" : "bg-white"
          }`}
        >
          <h4 className="text-[30px] mt-3 font-semibold">Find a ride</h4>
          <form onSubmit={submitHandler}>
            <div className="relative mt-6 ">
              <input
                value={pickup}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                onChange={handlePickupChange}
                className={`px-8 py-2 text-[19px] w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  darkMode
                    ? "bg-[#3c3c3c] placeholder:text-[#c4c4c4] text-white"
                    : "bg-[#eee] text-black"
                }`}
                type="text"
                placeholder="Add a pick-up location"
              />
              {pickup && (
                <button
                  type="button"
                  onClick={() => {
                    setPickup("");
                    setPickupSuggestions([]);
                  }}
                  className="absolute px-3 right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="relative mt-5">
              <input
                value={destination}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                onChange={handleDestinationChange}
                className={`px-8 py-2 text-[19px] w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  darkMode
                    ? "bg-[#3c3c3c] placeholder:text-[#c4c4c4] text-white"
                    : "bg-[#eee] text-black"
                }`}
                type="text"
                placeholder="Enter your destination"
              />
              {destination && (
                <button
                  type="button"
                  onClick={() => {
                    setDestination("");
                    setDestinationSuggestions([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
                >
                  &times;
                </button>
              )}
            </div>
          </form>

          {panelOpen && (
            <button
              onClick={findTrip}
              className="w-full bg-black mt-6 text-white text-lg font-semibold p-2 rounded-lg"
            >
              Find Trip
            </button>
          )}
        </div>

        <div
          ref={panelRef}
          className={`h-0 overflow-y-auto ${
            darkMode ? "bg-[#1B1B1B]" : "bg-white text-black"
          } ${panelOpen ? "px-6 py-2" : "p-0"}`}
        >
          <LocationSearchPanel
            darkMode={darkMode}
            setPanelOpen={setPanelOpen}
            setDestination={setDestination}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
          />
        </div>

        <div
          ref={settingRef}
          className="translate-x-full fixed z-20 left-0 h-full bg-white w-full pb-6"
        >
          <Settings
            showPopup={showPopup}
            editing={editing}
            setLogoutPanel={setLogoutPanel}
            popupMessage={popupMessage}
            setChangeDpPanel={setChangeDpPanel}
            user={user}
            setChangeUsernamePanel={setChangeUsernamePanel}
            setChangePasswordPanel={setChangePasswordPanel}
          />
        </div>

        <div
          className={`${
            changeDpPanel ? "" : "hidden"
          } fixed z-30 left-0 h-full ${
            darkMode ? "bg-white/5" : "bg-gray-300/50"
          } w-full pb-6`}
        >
          <ChangeDp
            showPopup={showPopup}
            darkMode={darkMode}
            user={user}
            setChangeDpPanel={setChangeDpPanel}
          />
        </div>

        <div
          className={`${logoutPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${
            darkMode ? "bg-white/5" : "bg-gray-300/50"
          } w-full pb-6`}
        >
          <LogoutPanel
            setLogoutPanel={setLogoutPanel}
            showPopup={showPopup}
            darkMode={darkMode}
          />
        </div>

        <div
          className={`${
            cancelRidePanel ? "" : "hidden"
          } fixed z-30 left-0 h-full ${
            darkMode ? "bg-white/5" : "bg-gray-300/50"
          } w-full pb-6`}
        >
          <CancelRidePanel
            setEditing={setEditing}
            ride={ride}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
            setCancelRidePanel={setCancelRidePanel}
            showPopup={showPopup}
            darkMode={darkMode}
            setWaitForDriverPanelOpen={setWaitForDriverPanelOpen}
          />
        </div>

        <div
          ref={changePasswordRef}
          className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6"
        >
          <ChangePassword
            showPopup={showPopup}
            darkMode={darkMode}
            setChangePasswordPanel={setChangePasswordPanel}
          />
        </div>

        <div
          ref={changeUsernameRef}
          className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6"
        >
          <ChangeUsername
            showPopup={showPopup}
            darkMode={darkMode}
            setChangeUsernamePanel={setChangeUsernamePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full px-3 pb-6`}
      >
        <VehiclePanel
          setPanelOpen={setPanelOpen}
          setSelectedVehicleImage={setSelectedVehicleImage}
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          darkMode={darkMode}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full px-3 pb-6`}
      >
        <ConfirmRide
          setEditing={setEditing}
          darkMode={darkMode}
          selectedVehicleImage={selectedVehicleImage}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
      <div
        ref={lookingForDriverPanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full px-3 pb-6 min-h-[55vh]`}
      >
        <LookingForDriver
          setCancelRidePanel={setCancelRidePanel}
          darkMode={darkMode}
          paymentMethod={paymentMethod}
          selectedVehicleImage={selectedVehicleImage}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
        />
      </div>

      <div
        ref={waitingForDriverPanelRef}
        className={`translate-y-full fixed z-10 bottom-0 ${
          darkMode ? "bg-[#1B1B1B] text-white" : "bg-white text-black"
        } w-full px-3 pb-6 min-h-[55vh]`}
      >
        <WaitForDriver
          setCancelRidePanel={setCancelRidePanel}
          selectedVehicleImage={selectedVehicleImage}
          darkMode={darkMode}
          ride={ride}
          setWaitForDriverPanelOpen={setWaitForDriverPanelOpen}
        />
      </div>
    </div>
  );
};

export default Start;
