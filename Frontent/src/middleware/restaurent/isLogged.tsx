import React,{useEffect} from "react";

import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/restaurent/authSlice";

const IsLogged=()=> {
    const { success,restaurent }= useSelector((state: any) => state.restaurentAuth);
    console.log(success,restaurent,'sucesssssssssssss in is logged');
    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('useeffect is working',success);
        if(!success){
            navigate('/restaurent/login')
        }
    },[success])

    useEffect(()=>{
        console.log('second effect is working');

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