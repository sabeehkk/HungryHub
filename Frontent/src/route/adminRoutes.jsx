import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../Pages/Admin/adminLogin';
import IsLogout from '../middleware/admin/isLogout';
import RestaurentList from '../Pages/Admin/restaurentList'
import EmployeeList from '../Pages/Admin/employeeList';
import UsersList from '../Pages/Admin/usersList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminFrame from '../Components/Admin/adminFrame' 
import Home from '../Pages/Admin/home' 
import ErrorPage from '../Components/errorPage.tsx' 


const AdminAppLayout = ()=>{
  return (
    <>
    <ToastContainer/>
    <AdminFrame/>
    </>
  )
}

 const AdminAuthAppLayout = () => { 
  return(
    <>
    <Outlet />
    <ToastContainer />
  </>
  )
 }


 const AdminRoute = {
    path:"/admin",
  errorElement: < ErrorPage path={"/admin"} />,


    element:<AdminAuthAppLayout/>,
    children:[
      {
        path:"login",
        element:(
          <>
          <Login/>
          </>
        ),
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
      path:"/admin",
      element:<AdminAppLayout/>,
      children:[
        {
          path:'home',
          element:<Home/>
        },
        {
          path:"users",
          element:(
            <>
              <UsersList/>
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
        },
      ]
    },

    ]
 }



export default AdminRoute