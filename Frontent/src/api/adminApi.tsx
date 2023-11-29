import axios from "axios";
import { adminAxios } from "../axios/axios";
import { ErrorMessage, SuccessMessage } from "../utils/util";
import { SwalAlert } from "../utils/util";
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

export const userActionAPI = async (id, action) => {
  const result =await SwalAlert()
  if (result.isConfirmed) {
  await adminAxios.patch(`/users/${id}/${action}`)
  .then((response) => {
    if (response.data.message) {
      return SuccessMessage(response.data.message);
    }
  })
  .catch((err) => {
    return ErrorMessage(err.message);
  });
}else{
  return ErrorMessage("Cancelled!!");
}
};

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

export const restaurentActionAPI = async (id, action) => {
   const result =await SwalAlert()
  if (result.isConfirmed) {
    await adminAxios
      .patch(`/restaurents/${id}/${action}`)
      .then((response) => {
        if (response.data.message) {
          return SuccessMessage(response.data.message);
        }
      })
      .catch((err) => {
        return ErrorMessage(err.message);
      });
  } else {
    return ErrorMessage("Cancelled!!");
  }
};
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

export const employeesActionAPI = async (id, action) => {
  const result =await SwalAlert()
  if (result.isConfirmed) {

  await adminAxios.patch(`/employees/${id}/${action}`)
  .then((response) => {
    if (response.data.message) {
      return SuccessMessage(response.data.message);
    }
  })
  .catch((err) => {
    return ErrorMessage(err.message);
  });
};
