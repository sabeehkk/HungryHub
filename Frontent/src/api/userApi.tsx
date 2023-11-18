import { userAxios } from "../axios/axios";
import axios from "axios";
import { ErrorMessage } from "../utils/util";

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

export const updatePassword = async (userId, data) => {
  const response = await userAxios.patch(
    `/profile/${userId}/editPassword`,
    data
  );
  return response.data.message == "success" ? true : false;
};

export const profileUploadCloudinery = async (img) => {
  const presetKey = import.meta.env.VITE_PRESETKEY;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", presetKey);
  formData.append("cloud_name", cloudName);

  const response = await axios.post(
    import.meta.env.VITE_CLOUDINERY_API,
    formData
  );
  if (response.status === 200) {
    console.log(response.data);

    return response.data.url;
  } else {
    return ErrorMessage("Failed to upload the image");
  }
};

export const updateProfileImage = async (userId, url) => {
  await userAxios.patch(`/profile/${userId}/edit/profilePhoto`, { url: url });
  return true;
};
