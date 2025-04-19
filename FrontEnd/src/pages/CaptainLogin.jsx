import React, { useState } from 'react'
import captainLogo from "../assets/captainLogo.png";
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useContext } from 'react';

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      email : email,
      password : password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if(response.status === 200){
      const data = response.data

      setCaptain(data.captain)

      localStorage.setItem('token', data.token)

      navigate('/captain-start')
    }
    setEmail("")
    setPassword("")
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <form onSubmit={(e) => {submitHandler(e)}}>
        <div>
        <img src={captainLogo} className='w-16 rounded-xl mb-10'/>
        </div>
        <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} required type="email" className='mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]' placeholder='email@example.com'/>
        <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} required type="password" className='mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]' placeholder='password'/>
        <button className='mb-3 bg-black text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 '>Login</button>
      </form>
      <p className='text-center'>Join as captain? <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>

      </div>

      <div>
      <Link to="/login" className='flex items-center justify-center mb-5 bg-yellow-500 text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 '>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
