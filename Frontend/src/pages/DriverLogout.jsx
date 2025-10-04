import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DriverLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("Drivertoken")
    axios.get(import.meta.env.VITE_BASE_URL+"/drivers/logout",{
        headers:{
            Authorization:`Bearer ${token}`
        }
        })
        .then(res => {
            if(res.status === 200){
                localStorage.removeItem("Drivertoken")
                navigate("/drivers/login")
            }
        })
        .catch(err => {
            console.error(err)
        })
   
  return (
    <div>
      
    </div>
  )
}

export default DriverLogout
