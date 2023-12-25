import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../redux/employee/authSlice'
import { useNavigate } from 'react-router-dom'

function UserLogout() {
     const dispatch=useDispatch()
     const navigate=useNavigate()
     useEffect(()=>{
        dispatch(logout())
        navigate("/employee/login");
     },[])
  return 
    <></>;
  
}

export default UserLogout