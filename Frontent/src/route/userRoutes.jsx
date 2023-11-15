import React from "react";
import { Outlet } from "react-router-dom";
import Signup from '../Pages/User/UserRegister'
import Login from '../Pages/User/login'
import Home from '../Components/User/HomePage'
import IsLogout from '../middleware/user/isLogout'
import UserLogout from '../Pages/User/userLogout'
import Navbar from '../Components/navbar'
import { ToastContainer,toast } from "react-toastify";
import OtpVerification from '../Components/User/otpVerification'

import 'react-toastify/dist/ReactToastify.css';

const UserAppLayout = () => {
  return (
    <>

    <Navbar/>
      <Outlet />
    <ToastContainer/>

    </>
  );
};
const UserAuthAppLayout = () => {
  return( 
    <>
  <Outlet />
  <ToastContainer/>
  </>
  )
};

const UserRoute={
  path:'/',
  element:<UserAuthAppLayout/>,
  children:[
    {
      path:'login',
      element:(
        <>
       <Login/>
        </>
      )
    },
   {
    path:"signup",
    element:(
      <>
      <Signup/>
      </>
    )
   },
   {
    path:'logout',
    element:(
      <>
      <IsLogout/>
      <UserLogout/>
      </>
    )
   },
   {
      path :'otp',
      element:(
        <>
        <OtpVerification/>
        </>
      )
   },
   {
    path:"/",    
    element:<UserAppLayout/>,
    
    children:[
      {
        path:"/",
        element:<Home/>
      }
    ]
   },
  

  ]
}

export default UserRoute;
