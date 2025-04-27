import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../Utils/axiosInstance'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axiosInstance.get("/users/logout`").then((response) => {
        if (response.status === 200){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default UserLogout
