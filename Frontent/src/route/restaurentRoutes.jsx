import React from "react";
import { Outlet } from "react-router-dom";
import Signup from "../Pages/Restaurent/signup";
import Login from "../Pages/Restaurent/login";
import Home from "../Components/Restaurant/Home";
import IsLogout from "../middleware/restaurent/isLogout.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Pages/Restaurent/restaurentNavbar";
import FoodAdd from "../Components/Restaurant/foodAdding";
import UserNavbar from "../Components/User/userNavbar";
import ErrorPage from "../Components/errorPage.tsx";
import Logout from "../Pages/Restaurent/logout.tsx";
import IsLogged from "../middleware/restaurent/isLogged";
import ProductAdd from '../Components/Restaurant/productAdding.tsx'

const RestaurantAppLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

const RestaurentAuthAppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

      <ToastContainer />
    </>
  );
};

const RestaurentRoute = {
  path: "/restaurent",
  errorElement: <ErrorPage path={"/restaurent"} />,

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
              <Home />
            </>
          ),
        },
         {
    path:'addFood',
    element:(
        <>
        <UserNavbar/>
        <ProductAdd/>
        </>
    ),
},
      ],
    },
  ],
};
export default RestaurentRoute;


