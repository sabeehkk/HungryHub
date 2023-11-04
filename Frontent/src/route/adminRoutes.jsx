import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Admin/adminLOgin'
// import Home from '../Components/Admin/adminHome'
// import AdminFrame '../Components/'
 
// const AdminAppLayout = () => {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// };

 const AdminLoginLayout = ()=>{
    return  <Outlet/>
 }    


 const AdminRoute={
    path:"/admin",
    element:<AdminLoginLayout/>,
    errorElement:<h1>Error</h1>,
    children:[
      {
        path:'login',
        element:(
          <>
          <Login/>
          </>
        )
      },
      // {
      //   path:"/admin",
      //   element:<AdminAppLayout/>,
      //   children:[
      //     {
      //       path:'/admin',
      //       element:<Home/>
      //     }
      //   ]
      // }
    ]
 }

// const AdminAppLayout=()=> {
//   return (
//     <>
//       <Frame/>
//     </>
//   )
// }

export default AdminRoute