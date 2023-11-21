import axios from "axios";
import { ErrorMessage } from "../utils/util";
import { restaurentAxios } from "../axios/axios";


export const uploadFoodImage = async (img) => {
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
      return response.data.url;
    } else {
      return ErrorMessage("Failed to upload the image");
    }
  };

  export const uploadFood = async (foodDetails) => {
    await restaurentAxios.post("/add-car", foodDetails);
  };
  
  export const uploadEditFood = async (foodId, foodDetails) => {
    await restaurentAxios.post(`/edit-car/${foodId}`, foodDetails);
  };