import React from "react";
import { Outlet } from "react-router-dom";
import Signup from "../Pages/Restaurent/signup";
import Login from "../Pages/Restaurent/login";
import Home from "../Components/Restaurant/Home" ;
import { ToastContainer, toast } from "react-toastify" ;
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Pages/Restaurent/restaurentNavbar";
// import UserNavbar from "../Components/User/userNavbar";
import ErrorPage from "../Components/errorPage.tsx";
import Logout from "../Pages/Restaurent/logout.tsx";
import ProductAdd from "../Components/Restaurant/productAdding.tsx";
// import Category from "../Components/Restaurant/category.tsx";
import RestaurentFrame from '../Components/Restaurant/restaurentFrame.tsx'
import Products from  '../Components/Restaurant/products.tsx';
import EditProduct from '../Components/Restaurant/editProduct.tsx'
import CategoryModal from "../Components/Restaurant/categoryList.tsx";
import IsLogout from "../middleware/restaurent/isLogout.tsx" ;
import IsLogged from "../middleware/restaurent/isLogged";
import OrderManagement from '../Components/Restaurant/orderManagement.tsx';
import OrderMoreViewPage from '../Components/Restaurant/orderMoreViewPage.tsx'
import RestaurentProfile from '../Components/Restaurant/restaurentProfile.tsx'
import Dummy from '../utils/dummy.tsx'

const RestaurantAppLayout = () => {
  return (
     <>     
      <Outlet />
      <ToastContainer />  
     </>   
  ) ;
} ;

const RestaurentAuthAppLayout = () => {
  return (
     <>
      <RestaurentFrame/>  
      <ToastContainer />
     </>
  );
};

const RestaurentRoute = {
  path: "/restaurent",
  // errorElement: <ErrorPage path={"/restaurent"} />,
  element: <RestaurantAppLayout />,
  children: [
    {
      path: "login",
      element: (
        <>
          <IsLogout />
          <Login />
        </>
      ),
    },
    {
      path: "signup",
      element: (
        <>
          <IsLogout />
          <Signup />
        </>
      ),
    },
    {
      path: "logout",
      element: (
        <>
          <IsLogged />
          <Logout />
        </>
      ),
    },
    {
      path: "/restaurent",
      element: <RestaurentAuthAppLayout />,
      children: [
        {
          path: "home",
          element: (
            <>
            <IsLogged/>
              <Home />
            </>
          ),
        },
        {
          path: "addProduct",
          element: (
            <>
               <IsLogged/>
              <ProductAdd />
            </>
          ),
        },
   
          {
            path:"products",
            element: (
              <>
              <IsLogged/>,
               <Products/>
              </>
            )
          },
          {
            path:"editProduct/:productId",
            element:(
              <>
              <IsLogged/>
             <EditProduct/>
              </>
            )
        },
        {
            path:"categoryAddingModal",
            element:(
              <>
              <IsLogged/>
            <CategoryModal/>
              </>
            )
        },
        {
          path:'orders',
          element:(
            <>
               <IsLogged/>
            <OrderManagement/>
            </>
           )
        },
        {
          path:'ordersMoreView/:id',
          element:(
            <>
               <IsLogged/>

            <OrderMoreViewPage/>
            </>
          )
        },
        {
          path:'restaurentProfile',
          element:(
            <>
            <IsLogged/>
            <RestaurentProfile/>
            </>
          )
        },
        {
          path:"dummy/:id",
          element:(
            <Dummy/>  
          )
        },
      ],
    },
  ],
};
export default RestaurentRoute;


     // {
        //   path:"addCategory",
        //   element :(
        //     <>
        //     <Category/>
        //     </>
        //   )
        // },