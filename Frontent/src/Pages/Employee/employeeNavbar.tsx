import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar =()=> {
  const { success } = useSelector((state: any)=>state.employeeAuth);
  return (
 <div className="md:mt-5  bg-gradient-to-r from-red-400 to-yellow-500 py-4 p-3  top-0 sticky z-50 shadow shadow-gray-200"> 
  <div className="container mx-auto my-3 flex items-center justify-between">
      <div id="logo" className="text-3xl font-bold text-black">
        Hungry Hub
      </div>

      <nav id="nav-items" className="space-x-4 md:block hidden">
        <Link to={'/employee/home'} className="text-gray-950 hover:text-white">
          HOME
        </Link>
        <Link to={'#'} className="text-gray-950 hover:text-white">
          Orders
        </Link>
        <Link to={'/employee/signup'} className="text-gray-950 hover:text-white">
          Work With Us
        </Link>
        
      </nav>
    <div className="md:flex hidden items-center ">

      {success ? 
      <Link className="text-gray-950 hover:text-yellow-500" to={'/employee/logout'}>Logout</Link>: 
      <Link className="text-gray-950 hover:text-yellow-500" to={'/login'}>Login / Register</Link>
      }

    </div>
  </div>
</div>

  )
}

export default Navbar