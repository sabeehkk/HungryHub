import React from 'react'
import { Outlet } from 'react-router-dom'

import Login from '../Pages/Admin/adminLogin';
import Home from '../Components/Admin/adminHome'
import UserList from '../Pages/Admin/usersList'
import IsLogout from '../middleware/admin/isLogout';
import RestaurentList from '../Pages/Admin/restaurentList'
import EmployeeList from '../Pages/Admin/employeeList';
import Navbar from '../Components/Admin/adminNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const AdminAuthAppLayout =()=>{ 
  return(
  <>
  {/* <AdminNavbar/> */}
  <Navbar/>
  <Outlet/>
  <ToastContainer/>

  </> 
  )
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
        path:'logout',
        element:(
          <>
          <IsLogout/>
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
      },
      {
        path:"restaurents",
        element:(
          <>
            <RestaurentList/>
          </>
        )
      },
    {
      path:"employees",
      element:(
        <>
        <EmployeeList/>
        </>
      )
    }
    ]
 }



export default AdminRoute