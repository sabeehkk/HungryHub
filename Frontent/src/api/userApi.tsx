import { userAxios } from "../axios/axios"
import axios from "axios"


export const verifyOtp = async (otp)=>{
    return await userAxios.post(`/verifyOtp`,otp)
}

export const SignupApi =async (userdata)=>{
      return await userAxios.post(`/register`,userData)
}

export const signupVerify = async (email, phoneNumber) => {
    return await userAxios.post(`/signupVerify`, { email, phoneNumber });
  };


  // export const signupVerify = async (email,phoneNumber)=>{
//        return await userAxios.post(`/signupVerify`,{email,phoneNumber})
// }
//   try {
//     axios
//       .post(`${USER_API}/register`, { email, password, name, phoneNumber })
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.message === "success") {
//           navigate("/login");
//           SuccessMessage(res.data.message);
//           return;
//         }
//         ErrorMessage(res.data.message);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.log(error);
//   }