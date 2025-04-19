import React, { useContext, useState } from "react";
import captainLogo from "../assets/captainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

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

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

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
    setVehicleCompany("")
    setVehicleModel("")
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <img src={captainLogo} className="w-16 rounded-xl mb-10" />
          </div>

          <h3 className="text-base mb-2 font-medium w-full">
            What's our captain's name
          </h3>
          <div className="flex gap-4 mb-6">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
              type="text"
              className=" bg-[#eeeeee] w-1/2 py-2 px-4 rounded border text-[15px] placeholder:text-[15px]"
              placeholder="First Name"
            />

            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              required
              type="text"
              className=" bg-[#eeeeee] w-1/2 py-2 px-4 rounded border text-[15px] placeholder:text-[15px]"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-base mb-2 font-medium">
            What's our captain's email
          </h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="email@example.com"
          />

          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]"
            placeholder="password"
          />

          <h3 className="text-base mb-2 font-medium">Vehicle information</h3>

          <div className="flex gap-2 mb-4">
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2 text-[15px] placeholder:text-[15px]"
              placeholder="Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2  text-[15px] placeholder:text-[15px]"
              placeholder="Plate"
            />
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="number"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2 text-[15px] placeholder:text-[15px]"
              placeholder="Capacity"
            />
          </div>


          <div className="flex gap-2 mb-4">
          <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 border h-[41px] text-[15px] placeholder:text-[15px]"
            >
              <option value="" disabled>
                Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
            <input
              value={vehicleCompany}
              onChange={(e) => setVehicleCompany(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2 text-[15px] placeholder:text-[15px]"
              placeholder="Company"
            />
            <input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2 text-[15px] placeholder:text-[15px]"
              placeholder="Model"
            />
          </div>

          <h3 className="text-base mb-2 font-medium pt-2">Upload Profile Photo</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="mb-6 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px]"
          />

          <button className="mb-1 bg-black text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 ">
            Create captain account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/signup"
          className="flex items-center justify-center mb-5 bg-yellow-500 text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 "
        >
          Sign up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
