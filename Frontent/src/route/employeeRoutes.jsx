import React from 'react'
import { Outlet } from 'react-router-dom'
import Signup from '../Pages/Employee/Signup'
import Home from '../Components/Employee/employeeHome'
import Login from '../Pages/Employee/login'
import Navbar from '../Pages/Employee/employeeNavbar'
import IsLogout from '../middleware/employee/isLogout';
import { ToastContainer,toast } from "react-toastify";
import ErrorPage from '../Components/errorPage.tsx'


const EmpoloyeeAppLayout =()=>{
    return (
        <>
        <Navbar/>
      <Outlet/>
    <ToastContainer/>

        </>
    )
}

const EmployeeAuthAppLayout = () =>{
    return( 
        <>
      <Outlet />
      <ToastContainer/>
      </>
      )
};

const EmployeeRoutes = {
    path :'/employee',
  errorElement: <ErrorPage path={"/employee"} />,

    element : <EmployeeAuthAppLayout/>,
    
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
            element:<EmpoloyeeAppLayout/>,
            children:[
                {
                    path:"home",
                    element:<Home/>
                }
            ]
        }
       
    ]
}
export default EmployeeRoutes