import axios from "axios";
import { ErrorMessage } from "../utils/util";
// import { ErrorMessage } from "../utils/utils";

// Define base URL from environment variables
const VITE_USER_BACKEND_URL = import.meta.env.VITE_USER_BACKEND_URLL;

// Define role-specific paths
const userPath = "";
const adminPath="/admin"
const restaurentPath ="/restaurent"
const employeePath ="/employee"
const chatPath ="/chat" ;
const messagePath ="/message"


const createRoleSpecificAxiosInstance = (tokenName, rolePath) => {
  const instance = axios.create({
    baseURL: `${VITE_USER_BACKEND_URL}${rolePath}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  instance.interceptors.response.use (
    (response) => response,
    (error) => {
      ErrorMessage(error.response.data.message);
      if (
        (error.response.status === 401 &&
          error.response.data.message === "Unauthorized") ||
        error.response.data.message ===
          "Access Denied: Your account has been temporarily blocked"
          
      ) {
        // return ErrorMessage(error.response.data.message)
        // console.log('axios is working')
        localStorage.removeItem(tokenName);
      } else if (error.response.status === 500) {
        console.error("Internal Server Error:", error.response.data);
      }
      return Promise.reject(error.response.data);
    }
  );
  return instance;
};

// Create separate instances for each role
const userAxios = createRoleSpecificAxiosInstance("userToken", userPath);
const adminAxios = createRoleSpecificAxiosInstance("adminToken",adminPath)
const restaurentAxios = createRoleSpecificAxiosInstance("restaurentToken",restaurentPath)
const employeeAxios = createRoleSpecificAxiosInstance('employeeToken',employeePath);
const chatAxios = createRoleSpecificAxiosInstance('userToken',chatPath);
const messageAxios = createRoleSpecificAxiosInstance('userToken',messagePath);

export { userAxios,adminAxios,restaurentAxios,employeeAxios,chatAxios,messageAxios };
