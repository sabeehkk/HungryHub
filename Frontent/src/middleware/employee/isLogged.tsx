import React,{useEffect} from "react";


import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/employee/authSlice";

const IsLogged=()=>{
    
    const {success} = useSelector((state:any)=> state.employeeAuth);
    console.log(success,'sucess')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(success,'use effect is called');
        
        if(!success){
            navigate('/employee/login')
        }
    },[success])

    useEffect(()=>{
        const token = localStorage.getItem("employeeToken")
        console.log(token,'token');
        
        if(!token){
            dispatch(logout())
            navigate("/employee/login")
        }
    },)
    return null   
}

export default IsLogged ;