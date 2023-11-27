import  {  useState,SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch } from "react-redux";
import { restaurentAxios } from "../../axios/axios";
import {ErrorMessage,SuccessMessage} from '../../utils/util'
import '../../Pages/User/style.css'
import { restaurentLoggedIn } from "../../redux/restaurent/authSlice";

function RestaurentLogin() {
  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
      
const handleSubmit = async (e: SyntheticEvent)=>{
  e.preventDefault();
  console.log('formdata',email,password)
  if(email ==='' || password===''){
      ErrorMessage("Please fill All fields")
       return;
  }
  try {
    await restaurentAxios
      .post(`/login`, { email, password })
      .then((res) => {
        localStorage.setItem("restaurentToken", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        dispatch(restaurentLoggedIn(res.data.restaurentData));
        navigate("/restaurent/home");
        SuccessMessage(res.data.message)
      })
  } catch (error) {
    console.log(error);
    ErrorMessage(error.message)
  }
}
  return (
    <div className=" min-h-screen  flex items-center justify-center bg-white ">
    <div className="bg-white p-6 rounded-lg shadow w-96 mb-24">
      <h2 className="my-heading">Restaurent Signing </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 font-bold">
            Username
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-500"
          >
            Login
          </button>
          <div className="text-sm md:flex md:justify-between mt-2">
              
              <Link
                to="/restaurent/signup"
                className="btn font-medium text-black-600 hover:text-black-900 flex justify-center"
              >
                Create your Partner account
              </Link>
            </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default RestaurentLogin
