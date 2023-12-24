import React from "react";
import { Outlet } from "react-router-dom";
import Signup from "../Pages/User/UserRegister";
import Login from "../Pages/User/login";
// import Home from '../Components/User/HomePage'
import IsLogout from "../middleware/user/isLogout" ;
// import Navbar from '../Components/navbar'
import { ToastContainer, toast } from "react-toastify";
import OtpVerification from "../Components/User/otpVerification";
import UserNavbar from "../Components/User/userNavbar";
import Hero from "../Components/User/hero";
import HeadlineCards from "../Components/User/headlineCards.tsx";
import Food from "../Components/User/food.tsx";
import Profile from "../Components/User/userProfile.tsx";
import EditProfile from "../Pages/User/profileEdit.tsx";
import ChangePassword from "../Components/User/editPassword.tsx";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "../Components/errorPage.tsx";
import IsLogged from "../middleware/user/isLogged.tsx";
import Logout from "../Pages/User/userLogout.tsx";
import Footer from '../Components/User/footer.tsx'
import FilteredRestaurent from '../Components/User/filteredRestaurents.tsx'
import MenuPage from '../Components/User/menu.tsx';
import CartPage from '../Components/User/cart.tsx'
import DummyCart from '../utils/cartDupe.tsx'
import CheckoutPage from '../Components/User/checkout.tsx';
import SuccessPage from '../Components/User/OrderSuccess.tsx';
import OrderFail from '../payment/paymentFiail.tsx'
import OrderHistory from '../Components/User/orderHistory.tsx'
import OrderItemsPage from '../Components/User/orderItemsPage.tsx';
import Chat from '../Components/chat/chat.tsx'
import MenuDummy from '../utils/checkoutDummy.tsx';
import Userchat from '../Components/User/userChat.tsx'
import Dummy from '../utils/dummy.tsx'
const UserAppLayout = () => {
  return (
    <>
      {/* <Navbar/> */}
      <Outlet />
    </>
  );
};
const UserAuthAppLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
      <Footer/>

    </>
  );
};

const UserRoute = {
  path: "/",
  // errorElement: <ErrorPage path={"/"} />,
  element: <UserAuthAppLayout />,
  children: [
    {
      path: "login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "signup",
      element: (
        <>
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
      path: "otp",
      element: (
        <>
          <OtpVerification />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <IsLogged />
          <UserNavbar />
          <Profile />
        </>
      ),
    },

    {
      path: "/profile/edit",
      element: (
        <>
          <IsLogged />
          <UserNavbar />
          <EditProfile />
        </>
      ),
    },
    {
      path: "/profile/editPassword",
      element: (
        <>
          <UserNavbar />
          <ChangePassword />
        </>
      ),
    },

    {
      path: "/",
      element: <UserAppLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <UserNavbar />
              <Hero />
              <HeadlineCards />
              <Food />
            </>
          ),
        },
      ],
    },
    {
      path:"/filterShops",
      element:(
        <>
              <UserNavbar />

        <FilteredRestaurent/>
        </>
      )
    },
    {
      path:"/menu/:restId",
      element:(
        <>
          <UserNavbar />
        <MenuPage/>
        </>
      )
    },
    {
      path:"/cart",
      element:(
        <>
          <IsLogged />

        <UserNavbar/>
        <CartPage/>
        </>
      )
    },
    {
      path:"/checkout",
      element:(
        <>

         <UserNavbar/>
         <CheckoutPage/>
        </>
       
      )
    },
    {
      path:"/CartPage",
      element:(
        <>
          <IsLogged />

         <UserNavbar/>
        <DummyCart/>
        </>
       
      )
    },
    {
      path:"/OrderSuccess",
      element:(
        <>
        <UserNavbar/>
        <SuccessPage/>
        </>
      )
    },
    
    { 
      path: "/payment-success/:orderId",
      element: (
        <>
           <SuccessPage />
        </>
      ),
    },
    {
      path:"/payment-fail",
      element: (
        <>
        <OrderFail/>
        </>
      )
    },
    {
      path:"/orders",
      element: (
        <>
          <IsLogged />
          <UserNavbar />
          <OrderHistory />
        </>
      ),
    },
    {
      path: "/orderItems/:ordId",
      element: (
        <>
          <IsLogged />
          <UserNavbar />
          <OrderItemsPage />
        </>
      ),
    },
    {
      path:"/chat",
      element:(
        <>
        <UserNavbar/>
        <Chat role={"user"}/>
        </>
      )
    },
    {
      path:"/menuss/:restId",
      element:(
         <>
          <UserNavbar />
         <MenuDummy/>
         </>
      )
    },
    {
      path:"/userChat",  
      element:(
         <>
         <UserNavbar />
         <Userchat/>
         </>
      )
    },
    {
      path:"/dummy",
      element:(
         <>
          <UserNavbar />
         <Dummy/>
         </>
      )
    },
  ],
};

export default UserRoute;
