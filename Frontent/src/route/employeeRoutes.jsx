import React from 'react'
import { Outlet } from 'react-router-dom'
// import Signup from '../Components/Employee/employeeSignup'
import Signup from '../Pages/Employee/Signup'
import Home from '../Components/Employee/employeeHome'
import Login from '../Pages/Employee/login'
import Navbar from '../Components/navbar'
import IsLogout from '../middleware/employee/isLogout';


const EmpoloyeeAppLayout =()=>{
    return (
        <>
        <Navbar/>
      <Outlet/>
        </>
      
    )
}

const EmployeeAuthAppLayout = () =>{
    return <Outlet/>
};

const EmployeeRoutes = {
    path :'/employee',
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