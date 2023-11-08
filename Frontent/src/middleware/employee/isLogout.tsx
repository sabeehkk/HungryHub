import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

function IsLogout() {
    const {success}=useSelector((state:any)=>state.employeeAuth)

    const navigate = useNavigate()
    
    useEffect(()=>{
        navigate('/employee/login') 
    },[success])
  return null
    
  
}

export default IsLogout