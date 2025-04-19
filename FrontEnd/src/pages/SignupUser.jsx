import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { UserDataContext } from "../context/UserContext";

const SignupUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate()

  const {setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname : {
        firstname: firstname,
        lastname : lastname,
      },
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201){
      const data = response.data

      setUser(data.user)
      localStorage.setItem('token', data.token)

      navigate('/start')
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
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
            <img src={Logo} className="w-16 rounded-xl mb-10" />
          </div>

          <h3 className="text-base mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
              type="text"
              className=" bg-[#eeeeee] w-1/2 py-2 px-4 rounded border text-[15px] placeholder:text-[15px]"
              placeholder="Firstname"
            />

            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              required
              type="text"
              className=" bg-[#eeeeee] w-1/2 py-2 px-4 rounded border text-[15px] placeholder:text-[15px]"
              placeholder="Lastname"
            />
          </div>
          <h3 className="text-base mb-2 font-medium">What's your email</h3>
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
          <button className="mb-3 bg-black text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 ">
            Sign up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-signup"
          className="flex items-center justify-center mb-5 bg-teal-600 text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 "
        >
          Sign up as captain
        </Link>
      </div>
    </div>
  );
};

export default SignupUser;
