import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { success } = useSelector((state: any) => state.restaurentAuth);
  return (
    <div className="md:mt-5  bg-gradient-to-r from-indigo-600 to-blue-500 py-4 p-3  top-0 sticky z-50 shadow shadow-gray-200">
      <div className="container mx-auto my-3 flex items-center justify-between">
        <div id="logo" className="text-3xl font-bold text-white">
          Hungry Hub
        </div>
        <nav id="nav-items" className="space-x-4 md:block hidden">
          <Link to={"/admin"} className="text-gray-950 hover:text-white">
            HOME
          </Link>
          <Link to={"/admin/users"} className="text-gray-950 hover:text-white">
            Users
          </Link>
          <Link
            to={"/admin/restaurents"}
            className="text-gray-950 hover:text-white"
          >
            Restaurent
          </Link>
          <Link
            to={"/admin/employees"}
            className="text-gray-950 hover:text-white"
          >
            Employee
          </Link>
        </nav>
        <div className="md:flex hidden items-center ">
          {success ? (
            <Link
              className="text-gray-950 hover:text-yellow-500"
              to={"/admin/logout"}
            >
              Logout
            </Link>
          ) : (
            <Link
              className="text-gray-950 hover:text-yellow-500"
              to={"/admin/login"}
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
