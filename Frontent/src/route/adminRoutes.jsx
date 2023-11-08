import React from 'react'
import { Outlet } from 'react-router-dom'

import Login from '../Pages/Admin/adminLogin';
import Home from '../Components/Admin/adminHome'
import UserList from '../Components/Admin/usersList'
 const AdminAuthAppLayout =()=>{
  return <Outlet/>
 };

 const AdminRoute={
    path:"/admin",
    element:<AdminAuthAppLayout/>,
    children:[
      {
        path:"login",
        element:(
          <>
          <Login/>
          </>
        )
      },
      {
        path:'/admin',
        element:(
          <>
          <Home/>
          </>
        )
      },
      {
        path:"users",
        element:(
          <>
        <UserList/>
          </>
        )
      }
    ]
 }



export default AdminRoute