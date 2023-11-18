import React from "react";
import { Outlet } from "react-router-dom";
import Signup from '../Pages/User/UserRegister'
import Login from '../Pages/User/login'
// import Home from '../Components/User/HomePage'
import IsLogout from '../middleware/user/isLogout'
import UserLogout from '../Pages/User/userLogout'
// import Navbar from '../Components/navbar'
import { ToastContainer,toast } from "react-toastify";
import OtpVerification from '../Components/User/otpVerification';
import UserNavbar from '../Components/User/userNavbar';
import Hero from '../Components/User/hero'
import HeadlineCards from  '../Components/User/headlineCards.tsx'
import Food from '../Components/User/food.tsx'
import Profile from '../Components/User/userProfile.tsx'
import EditProfile from '../Pages/User/profileEdit.tsx'
import ChangePassword from '../Components/User/editPassword.tsx'

import 'react-toastify/dist/ReactToastify.css';

const UserAppLayout = () => {
  return (
    <>

    {/* <Navbar/> */}
    <UserNavbar/>
    <Hero/>
    <HeadlineCards/>
    <Food/>
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
    path:'/profile',
    element:(
     <>
      <UserNavbar/>
      <Profile/>
     </>
    )
   },
 
   {
    path:'/profile/edit',
    element:(
      <>
      <UserNavbar/>
      <EditProfile/>
      </>
    )
   },
   {
    path:'/profile/editPassword',
    element:(
      <>
      <UserNavbar/>
       <ChangePassword/>
      </>
    )
   },
   {
    path:"/",    
    element:<UserAppLayout/>,
    children:[
      {
        path:"/",
        // element:<Home/>
      }
    ]
   },
  ]
}

export default UserRoute;
