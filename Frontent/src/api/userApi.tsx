import { userAxios } from "../axios/axios"
import axios from "axios"


export const verifyOtp = async (otp) => {
  console.log(otp.data);
  
  try {
      const response = await userAxios.post(`/verifyOtp`, otp);
      console.log("Backend Response:", response.data);
      return response;
  } catch (error) {
      console.error("Error from Backend:", error);
      throw error; 
  }
};

export const SignupApi =async (userdata)=>{
      return await userAxios.post(`/register`,userdata)
}

export const signupVerify = async (email, phoneNumber) => {
    return await userAxios.post(`/signupVerify`, { email, phoneNumber });
  };
