import { userAxios } from "../axios/axios";
import axios from "axios";

export const verifyOtp = async (otp) => {
  try {
    const response = await userAxios.post(`/verifyOtp`, otp);
    // console.log("Backend Response:", response.data);
    return response;
  } catch (error) {
    console.error("Error from Backend:", error);

    throw error;
  }
};

export const SignupApi = async (userdata) => {
  return await userAxios.post(`/register`, userdata);
};

export const signupVerify = async (email, phoneNumber) => {
  return await userAxios.post(`/signupVerify`, { email, phoneNumber });
};


export const updateProfileData = async (data, userId) => {
  const response = await userAxios.patch(`/profile/${userId}/edit`, data);
  return response.data.message == "success" ? true : false;
};
