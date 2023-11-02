import axios from "axios";
// import { ErrorMessage } from "../utils/utils";

// Define base URL from environment variables
const VITE_USER_BACKEND_URL = import.meta.env.VITE_USER_BACKEND_URL;

// Define role-specific paths
const userPath = "";
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

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
    //   ErrorMessage(error.response.data.message);
      if (
        (error.response.status === 401 &&
          error.response.data.message === "Unauthorized") ||
        error.response.data.message ===
          "Access Denied: Your account has been temporarily blocked"
      ) {
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


export { userAxios };
