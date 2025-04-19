import React, { useContext, useState } from 'react'
import Logo from "../assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const LoginUser = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate  = useNavigate()
  const {setUser} = useContext(UserDataContext)

  const submitHandler = async(e) => {
    e.preventDefault()

    const userData = {
      email : email,
      password : password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if(response.status === 200){
      const data = response.data

      setUser(data.user)
      localStorage.setItem("token", data.token)

      navigate('/start')
    }

    setEmail("")
    setPassword("")
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <form onSubmit={(e) => {submitHandler(e)}}>
        <div>
        <img src={Logo} className='w-16 rounded-xl mb-10'/>
        </div>
        <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} required type="email" className='mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]' placeholder='email@example.com'/>
        <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} required type="password" className='mb-7 bg-[#eeeeee] py-2 px-4 rounded border w-full text-[15px] placeholder:text-[15px]' placeholder='password'/>
        <button className='mb-3 bg-black text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 '>Login</button>
      </form>
      <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new account</Link></p>

      </div>

      <div>
      <Link to="/captain-login" className='flex items-center justify-center mb-5 bg-teal-600 text-white text-lg py-2 px-4 rounded w-full placeholder:text-[15px] active:scale-105 duration-300 '>Sign in as captain</Link>
      </div>
    </div>
  )
}

export default LoginUser
