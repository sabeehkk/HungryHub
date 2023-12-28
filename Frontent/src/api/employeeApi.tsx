import axios from "axios";
import { ErrorMessage } from "../utils/util";
import { employeeAxios } from "../axios/axios";

export const forgotPassword = async (email) => {
    const response = await employeeAxios.post("/forgot-password", { email });
    return response.data?.message;
  };
  
  export const forgotPasswordOtpVerification = async (otp) => {
    const response = await employeeAxios.post("/forgot-password/otp", { otp });
    return response.data?.message;
  };
  
  export const resetPassword = async (email, password) => {
    try {
      const response = await employeeAxios.post("/forgot-password/reset-password", {
        email,
        password,
      });
      return response.data?.message;
    } catch (error) {}
  };
  
  