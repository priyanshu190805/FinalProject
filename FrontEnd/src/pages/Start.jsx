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
import axios from "axios";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";
import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword";
import ChangeUsername from "../components/ChangeUsername";
import { ThemeDataContext } from "../context/ThemeContext";
import ChangeDp from "../components/ChangeDp";

const Start = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [waitForDriverPanelOpen, setWaitForDriverPanelOpen] = useState(false);
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] =useState(false);
  const [changePasswordPanel, setChangePasswordPanel] =useState(false);
  const [changeUsernamePanel, setChangeUsernamePanel] =useState(false);
  const [changeDpPanel, setChangeDpPanel] =useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [selectedVehicleImage, setSelectedVehicleImage] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const settingRef = useRef(null);
  const changePasswordRef = useRef(null)
  const changeUsernameRef = useRef(null)

  const { socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();
  const {darkMode, setDarkMode} = useContext(ThemeDataContext)

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

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPickupSuggestions(response.data);
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setDestinationSuggestions(response.data);
  };

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickup,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  function showPopup(message) {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage(""); // Clear popup after 3 seconds
    }, 3000);
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
    function(){
      if(changePasswordPanel){
        gsap.to(changePasswordRef.current, {
          transform : 'translateX(0)'
        });
      }
      else {
        gsap.to(changePasswordRef.current, {
          transform : 'translateX(100%)'
        })
      }
    },
    [changePasswordPanel]
  )

  useGSAP(
    function(){
      if(changeUsernamePanel){
        gsap.to(changeUsernameRef.current, {
          transform : 'translateX(0)'
        })
      }
      else {
        gsap.to(changeUsernameRef.current, {
          transform : 'translateX(100%)'
        })
      }
    },[changeUsernamePanel]
  )


  return (
    <div className="h-screen relative overflow-hidden">
      <LiveTracking />
      <div className="">
        <img
          src={Logo}
          className="w-16 absolute rounded-xl mb-10 top-7 left-7"
        />
        <button
          style={{ zIndex: 9999 }}
          onClick={() => {
            if(!settingOpen){
              setSettingOpen(true)
            }
            else{
              setSettingOpen(false)
            }

            if(settingOpen && changePasswordPanel){
              setSettingOpen(true)
              setChangePasswordPanel(false)
            }

            if(settingOpen && changeUsernamePanel){
              setSettingOpen(true)
              setChangeUsernamePanel(false)
            }

            if(settingOpen && changeDpPanel){
              setSettingOpen(true)
              setChangeDpPanel(false)
            }
          }}
          className="hello absolute w-10 h-10 mb-10 top-7 right-7 bg-black flex justify-center items-center rounded-full"
        >
           <i className={`text-xl font-semibold text-white ${
    settingOpen ? "ri-arrow-left-line" : "ri-menu-line"
  }`}></i>
        </button>
      </div>

      <div className="absolute h-screen top-0 flex flex-col justify-end">
        <div className={`home px-6 pt-5 pb-10 ${darkMode ? "bg-[#1B1B1B] text-white" : "bg-white"}`}>
          <h4 className="text-[30px] font-semibold">Find a ride</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              onChange={handlePickupChange}
              className={`px-8 py-2 text-[19px] ${darkMode ? "bg-[#3c3c3c] placeholder:text-[#c4c4c4]" : "bg-[#eee]"} rounded-lg w-full mt-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
              className={`px-8 py-2 text-[19px] ${darkMode ? "bg-[#3c3c3c] placeholder:text-[#c4c4c4]" : "bg-[#eee]"} rounded-lg w-full mt-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              type="text"
              placeholder="Enter your destination"
            />
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

        <div ref={panelRef} className={`h-0 ${darkMode ? "bg-[#1B1B1B]" : "bg-white text-black"} ${panelOpen ? "px-6 py-2" : "p-0"}`}>
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
          <Settings popupMessage={popupMessage} setPopupMessage={setPopupMessage} setChangeDpPanel={setChangeDpPanel} user={user} setChangeUsernamePanel={setChangeUsernamePanel} setChangePasswordPanel={setChangePasswordPanel}/>
        </div>

        <div className={`${changeDpPanel ? "" : "hidden"} fixed z-30 left-0 h-full ${darkMode ? "bg-white/5" :"bg-gray-300/50"} w-full pb-6`}>
          <ChangeDp showPopup={showPopup} darkMode={darkMode} user={user} setChangeDpPanel={setChangeDpPanel}/>
        </div>

        <div ref={changePasswordRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
          <ChangePassword showPopup={showPopup} darkMode={darkMode} setChangePasswordPanel={setChangePasswordPanel}/>
        </div>

        <div ref={changeUsernameRef} className="translate-x-full fixed z-30 left-0 h-full bg-white w-full pb-6">
          <ChangeUsername showPopup={showPopup} darkMode={darkMode}  setChangeUsernamePanel={setChangeUsernamePanel}/>
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6"
      >
        <VehiclePanel
          setSelectedVehicleImage={setSelectedVehicleImage}
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6"
      >
        <ConfirmRide
          selectedVehicleImage={selectedVehicleImage}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
        />
      </div>

      <div
        ref={lookingForDriverPanelRef}
        className="translate-y-full fixed z-10 bottom-0 bg-white w-full px-3 pb-6 min-h-[55vh]"
      >
        <LookingForDriver
          selectedVehicleImage={selectedVehicleImage}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
        />
      </div>
c
      <div
        ref={waitingForDriverPanelRef}
        className="fixed z-10 bottom-0 bg-white w-full px-3 pb-6"
      >
        <WaitForDriver
          ride={ride}
          setWaitForDriverPanelOpen={setWaitForDriverPanelOpen}
        />
      </div>
      
    </div>
  );
};

export default Start;
