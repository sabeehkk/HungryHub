import { userAxios } from "../axios/axios";
import axios from "axios";
import { ErrorMessage } from "../utils/util";



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
  console.log("profileUploadCloudinery api is running");
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

export const productImageUploadCloudinary = async (images) => {
  console.log(images, "api calling");
  const presetKey = import.meta.env.VITE_PRESETKEY;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("file", images[i]);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);
  }
  try {
    const response = await axios.post(
      import.meta.env.VITE_CLOUDINERY_API,
      formData
    );

    if (response.status === 200) {
      return response.data.urls; // Assuming Cloudinary returns an array of URLs for multiple images
    } else {
      throw new Error("Failed to upload the images");
    }
  } catch (error) {
    throw new Error("Failed to upload the images");
  }
};

// export const makePayment = async (payment, addressIndex: selectedAddressIndex,cartData) => {
//   const response = await userAxios.post("/rent-booking", {payment, addressIndex: selectedAddressIndex,cartData});
//   return response?.data?.url;
// };
export const makePayment = async ({payment, addressIndex, cartData}) => {
  const response = await userAxios.post("/order", {
   
    
    payment,
    addressIndex,
    cartData
  });
  console.log(response.data,'response data in order'); 
  return response?.data?.url;
};

export const forgotPassword = async (email) => {
  const response = await userAxios.post("/forgot-password", { email });
  return response.data?.message;
};

export const forgotPasswordOtpVerification = async (otp) => {
  const response = await userAxios.post("/forgot-password/otp", { otp });
  return response.data?.message;
};

export const resetPassword = async (email, password) => {
  try {
    const response = await userAxios.post("/forgot-password/reset-password", {
      email,
      password,
    });
    return response.data?.message;
  } catch (error) {}
};
