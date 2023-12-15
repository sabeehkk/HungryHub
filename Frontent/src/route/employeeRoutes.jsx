import React from 'react'
import { Outlet } from 'react-router-dom'
import Signup from '../Pages/Employee/Signup'
import Home from '../Components/Employee/employeeHome'
import Login from '../Pages/Employee/login'
import IsLogout from '../middleware/employee/isLogout';
import { ToastContainer,toast } from "react-toastify";
import ErrorPage from '../Components/errorPage.tsx'
import EmployeeFrame from '../Components/Employee/employeeFrame.tsx'

const EmpoloyeeAppLayout =()=>{
    return (
        <>
      <Outlet/>
    <ToastContainer/>
       </>
    )
}

const EmployeeAuthAppLayout = () =>{
    return( 
        <>
      <EmployeeFrame />
      <ToastContainer/>
      </>
      )
};

const EmployeeRoutes = {
    path :'/employee',
  errorElement: <ErrorPage path={"/employee"} />,

    element : <EmpoloyeeAppLayout/>,
    
    children : [
        {
            path:'login',
            element:(
                <>
                <Login/>
                </>
            )
        },
        {
            path :'signup',
            element : (
                <>
                <Signup/>
                </>
            )
        },
        {
           path:'logout',
           element: (
            <>
            <IsLogout/>
            </>
           )
        },
        {
            path:'/employee',
            element:<EmployeeAuthAppLayout/>,
            children:[
                {
                    path:"home",
                    element:<Home/>
                }
            ]
        },

    ]
}
export default EmployeeRoutes