import React from 'react'
import { Outlet } from 'react-router-dom'
// import Signup from '../Components/Employee/employeeSignup'
import Signup from '../Pages/Employee/Signup'
import Home from '../Components/Employee/employeeHome'
import Login from '../Pages/Employee/login'

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
            path:'/employee',
            element:(
                <>
                <Home/>
                </>
            )
        },
       
    ]
}
export default EmployeeRoutes