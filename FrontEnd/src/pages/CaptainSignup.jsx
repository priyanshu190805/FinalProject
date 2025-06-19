import React, { useContext, useState } from "react";
import captainLogo from "../assets/captainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { PopupDataContext } from "../context/PopupContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const { popupMessage, popupStatus, showPopup } = useContext(PopupDataContext);
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("color", vehicleColor);
      formData.append("plate", vehiclePlate);
      formData.append("capacity", vehicleCapacity);
      formData.append("vehicleType", vehicleType);
      formData.append("profileImage", profileImage);
      formData.append("company", vehicleCompany);
      formData.append("model", vehicleModel);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        formData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-start");
      }

      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
      setProfileImage(null);
      setVehicleCompany("");
      setVehicleModel("");
    } catch (error) {
      if (error.response?.status === 400) {
        showPopup("A captain with the same email already exists.", "failed");
      } else {
        showPopup("Something went wrong. Please try again later.", "failed");
      }
    }
  };

  return (
    <div className="pt-8 py-7 px-4 sm:px-7 flex flex-col justify-between min-h-screen w-full">
      {popupMessage && (
        <div
          className={`absolute top-0 left-0 w-full ${
            popupStatus === "success" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 text-sm text-center z-50`}
        >
          {popupMessage}
        </div>
      )}
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={submitHandler}>
          <div>
            <img src={captainLogo} className="w-16 rounded-xl mb-10" />
          </div>

          <h3 className="text-base mb-2 font-medium">
            What's our captain's name
          </h3>
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] flex-1 min-w-[45%] py-2 px-4 rounded border text-[15px]"
              placeholder="First Name"
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] flex-1 min-w-[45%] py-2 px-4 rounded border text-[15px]"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-base mb-2 font-medium">
            What's our captain's email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px]"
            placeholder="email@example.com"
          />

          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px]"
            placeholder="password"
          />

          <h3 className="text-base mb-2 font-medium">Vehicle information</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            <input
              value={vehicleCompany}
              onChange={(e) => setVehicleCompany(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border flex-1 min-w-[30%] text-[15px]"
              placeholder="Company"
            />
            <input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border flex-1 min-w-[30%] text-[15px]"
              placeholder="Model"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => {
                const selectedType = e.target.value;
                setVehicleType(selectedType);
                if (selectedType === "car") setVehicleCapacity(4);
                else if (selectedType === "bike") setVehicleCapacity(1);
                else if (selectedType === "auto") setVehicleCapacity(3);
              }}
              className="bg-[#eeeeee] rounded-lg px-4 border h-[41px] flex-1 min-w-[30%] text-[15px]"
            >
              <option value="" disabled>
                Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border flex-1 min-w-[30%] text-[15px]"
              placeholder="Plate"
            />
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border flex-1 min-w-[30%] text-[15px]"
              placeholder="Color"
            />
            <input
              value={vehicleCapacity}
              disabled
              required
              type="number"
              className="bg-[#eeeeee] py-2 px-4 rounded border flex-1 min-w-[30%] text-[15px]"
              placeholder="Capacity"
            />
          </div>

          <h3 className="text-base mb-2 font-medium pt-2">
            Upload Profile Photo
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px]"
          />

          <button className="mb-1 bg-black text-white text-lg py-2 px-4 rounded w-full active:scale-105 duration-300">
            Create captain account
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-5">
        <Link
          to="/signup"
          className="flex items-center justify-center mb-5 bg-yellow-500 text-white text-lg py-2 px-4 rounded w-full active:scale-105 duration-300"
        >
          Sign up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
