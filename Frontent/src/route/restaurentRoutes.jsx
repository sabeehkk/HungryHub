import React from 'react'
import { Outlet } from "react-router-dom";
import Signup from '../Components/Restaurant/Signup'
import Login from '../Components/Restaurant/Login'
import Home from '../Components/Restaurant/Home'

// const RestaurentAppLayout=()=> {
//   return (
//     <>
//     <Outlet/>
//     </>
//   )
// };
const RestaurentAuthAppLayout =()=>{
    return <Outlet/>
};

const RestaurentRoute ={
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
            )
        },
        {
            path:'/restaurent',
            element:(
                <>
                <Home/>
                </>
            )
        }
        //   {
        //     path:'/restaurent',
        //     elem
        //   }
        // {
        //     path:'/restaurent',
        //     element:<RestaurentAppLayout/>,
        //     children:[
        //         {
        //             path:'/restaurent',
        //             element : <Home/>
        //         }
        //     ]
        // },
    ]
}

export default RestaurentRoute   