import React from 'react'
import { Outlet } from "react-router-dom";
import Signup from '../Pages/Restaurent/signup'
import Login from '../Pages/Restaurent/login'
import Home from '../Components/Restaurant/Home'

//  


const RestaurentAuthAppLayout =()=>{
        return  <Outlet/> 
};
// const RestaurentLayout =()=>{
//     return (
//         <>
//         </>
//     )
// }

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
            path:'/restaurent',
            element:(
                <>
                <Home/>
                </>
            )
        }
     
        // {
        //     path:"/restaurent",
        //     element:<RestaurentAppLayout/>,
        //     children:[
        //         {
        //             path:"/restaurent",
        //             element:(
        //                 <>
        //                 <Home/>
        //                 </>
        //             )
        //         }
        //     ]
        // },
       
            
            // element:(
            //     <>
            //     <Home/>
            //     </>
            // )
       
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