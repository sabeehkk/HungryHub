import React,{useEffect} from "react";


import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/restaurent/authSlice";

function IsLogged(){
    const {success} = useSelector((state:any)=> state.restaurentAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!success){
            navigate('/restaurent/login')
        }
    },[success])

    useEffect(()=>{
        const token = localStorage.getItem("restaurentToken")
        console.log(token);
        
        if(!token){
            dispatch(logout())
            navigate("/restaurent/login")
        }
    },[])
    return null   
}

export default IsLogged ;