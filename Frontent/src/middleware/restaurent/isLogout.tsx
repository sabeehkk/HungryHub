import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsLogout=()=> {
  const { success }= useSelector((state: any) => state.restaurentAuth);
 console.log(success,'successsssssss');
 
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/restaurent/home");
    }
  }, [success]);
  return null;
}

export default IsLogout;
