import React from 'react'
import { Outlet } from 'react-router-dom'
// import Login from '../Components/Admin/adminLOgin'
// import Login from '../Pages/Admin/adminLogin'
import Login from '../Components/Admin/adminLOgin';
import Home from '../Components/Admin/adminHome'
// import AdminFrame '../Components/'
 
// const AdminAppLayout = () => {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// };



 const AdminAuthAppLayout =()=>{
  return <Outlet/>
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
      }
    ]
 }



export default AdminRoute