import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Admin/adminLogin";
import IsLogout from "../middleware/admin/isLogout";
import Logout from "../Pages/Admin/logout.tsx";
import RestaurentList from "../Pages/Admin/restaurentList";
import EmployeeList from "../Pages/Admin/employeeList";
import UsersList from "../Pages/Admin/usersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminFrame from "../Components/Admin/adminFrame";
import Home from "../Pages/Admin/home";
import ErrorPage from "../Components/errorPage.tsx";
import IsLogged from "../middleware/admin/isLogged.tsx";

const AdminAppLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminFrame />
    </>
  );
};
const AdminAuthAppLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};
const AdminRoute = {
  path: "/admin",
  errorElement: <ErrorPage path={"/admin"} />,
  element: <AdminAuthAppLayout />,
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
      path: "logout",
      element: (
        <>
          <Logout />
        </>
      ),
    },
    {
      path: "/admin",
      element: <AdminAppLayout />,
      children: [
        {
          path: "home",
          element: (
            <>
              <IsLogged />
              <Home />
            </>
          ),
        },
        {
          path: "users",
          element: (
            <>
              <IsLogged />
              <UsersList />
            </>
          ),
        },
        {
          path: "restaurents",
          element: (
            <>
              <IsLogged />
              <RestaurentList />
            </>
          ),
        },
        {
          path: "employees",
          element: (
            <>
              <IsLogged />
              <EmployeeList />
            </>
          ),
        },
      ],
    },
  ],
};

export default AdminRoute;
