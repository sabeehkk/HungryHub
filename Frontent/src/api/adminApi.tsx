import axios from "axios"
import { adminAxios } from "../axios/axios"


export const usersData = async (page) => {
    const response = await adminAxios.get(`/users`, {
      params: {
        page,
      },
    });
    return {
      userData: response?.data?.userData,
      size: response?.data?.size ? response.data.size : 1,
    };
  };



export const userActionAPI = async (id, action)=>{
    await adminAxios.patch(`/users/${id}/${action}`);
}