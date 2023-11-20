import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../redux/restaurent/authSlice'
import { useNavigate } from 'react-router-dom'

function Logout() {

     const dispatch=useDispatch()
     const navigate=useNavigate()

     useEffect(()=>{
        dispatch(logout())
        navigate("/restaurent/login")
     },[])

  return 
    <></>;
  
}

export default Logout