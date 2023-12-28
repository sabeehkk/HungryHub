import React from "react";
import { Outlet } from "react-router-dom";
import Signup from "../Pages/Employee/Signup";
import Home from "../Components/Employee/employeeHome";
import Login from "../Pages/Employee/login";
import IsLogout from "../middleware/employee/isLogout";
import { ToastContainer } from "react-toastify";
import EmployeeFrame from "../Components/Employee/employeeFrame.tsx";
import Islogged from "../middleware/employee/isLogged.tsx";
import Logout from "../Pages/Employee/logout.tsx";
import DeliveryHistory from "../Components/Employee/deliveryHistory.tsx";
import EmployeeChat from "../Components/Employee/employeeChat.tsx";
import ForgotPassword from '../Pages/Restaurent/forgotPassword.tsx';

const EmpoloyeeAppLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};
const EmployeeAuthAppLayout = () => {
  return (
    <>
      <EmployeeFrame />
      <ToastContainer />
    </>
  );
};
const EmployeeRoutes = {
  path: "/employee",
  // errorElement: <ErrorPage path={"/employee"} />,
  element: <EmpoloyeeAppLayout />,
  children: [
    {
      path: "login",
      element: (
        <>
          <IsLogout />
          <Login />
        </>
      ),
    },
    {
      path: "signup",
      element: (
        <>
          <IsLogout />
          <Signup />
        </>
      ),
    },
    {
      path: "logout",
      element: (
        <>
          <Islogged />
          <Logout />
        </>
      ),
    },
    { 
      path:'forgot-password',
      element: (
        <>
        <ForgotPassword/>
        </>
        )
      },
    {
      path: "/employee",
      element: <EmployeeAuthAppLayout />,
      children: [
        {
          path: "home",
          element: (
            <>
              <Islogged />
              <Home />
            </>
          ),
        },
        {
          path: "deliveryHistory",
          element: (
            <>
              <Islogged />
              <DeliveryHistory />
            </>
          ),
        },
        {
          path: "employeeChat",
          element: (
            <>
              <Islogged />
              <EmployeeChat />
            </>
          ),
        },
        
      ],
    },
  ],
};
export default EmployeeRoutes;
