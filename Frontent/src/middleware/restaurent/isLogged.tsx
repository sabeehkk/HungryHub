import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/restaurent/authSlice";

const IsLogged=()=> {
    const { success,restaurent }= useSelector((state: any) => state.restaurentAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!success){
            navigate('/restaurent/login')
        }
    },[success])

    useEffect(()=>{
        const token = localStorage.getItem("restaurentToken")
        if(!token){
            dispatch(logout())
            navigate("/restaurent/login")
        }
    },[])
    return null   
}

export default IsLogged ;