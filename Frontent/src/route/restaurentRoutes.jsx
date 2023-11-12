import React from 'react'
import { Outlet } from "react-router-dom";
import Signup from '../Pages/Restaurent/signup'
import Login from '../Pages/Restaurent/login'
import Home from '../Components/Restaurant/Home'
import Navbar from '../Components/navbar';
import IsLogout from '../middleware/restaurent/isLogged'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//  
const RestaurantAppLayout = ()=>{
    return (
            <>
           <Navbar/>
            <Outlet/>
            <ToastContainer/>

            </>
    )
}

const RestaurentAuthAppLayout =()=>{
    return( 
        <>
      <Outlet />
      <ToastContainer/>
      </>
      )
};

const RestaurentRoute = {   
    path:'/restaurent',
    element :<RestaurentAuthAppLayout/>,
    children : [
        {
            path :'login',   
            element : (
                <>
                <Login/>
                </>
            )
        },
        {
            path:'signup',
            element:(
                <>
                <Signup/>
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
            path:'/restaurent',
            element:<RestaurantAppLayout/>,
            children:[
                {
                    path:"home",
                    element:<Home/>
                }
            ]
        }
    ]
}

export default RestaurentRoute   