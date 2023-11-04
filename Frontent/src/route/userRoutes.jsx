import React from "react";
import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import Signup from '../Pages/User/UserRegister'
import Login from '../Pages/User/login'
import Home from '../Components/User/HomePage'
import IsLogout from '../middleware/user/isLogout'
import UserLogout from '../Pages/User/userLogout'
const UserAppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const UserAuthAppLayout = () => {
  return <Outlet />;
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
