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


export const restaurentsData = async (page) => {
  const response = await adminAxios.get(`/restaurents`, {
    params: {
      page,
    },
  });
  return {
    restaurentData: response?.data?.restaurentData,
    size: response?.data?.size ? response.data.size : 1,
  };
};

export const restaurentActionAPI = async (id, action)=>{
  await adminAxios.patch(`/restaurents/${id}/${action}`);
}

export const employeesData = async (page) => {
  const response = await adminAxios.get(`/employees`, {
    params: {
      page,
    },
  });
  return {
    employeeData: response?.data?.employeeData,
    size: response?.data?.size ? response.data.size : 1,
  };
};

export const employeesActionAPI = async (id, action)=>{
  await adminAxios.patch(`/employees/${id}/${action}`);
}
