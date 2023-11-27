import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {logout} from '../../redux/restaurent/authSlice'

const Logout=()=> {

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