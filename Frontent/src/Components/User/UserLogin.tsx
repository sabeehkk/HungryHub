import  {  useState,SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../redux/user/authSlice";
import { userAxios } from "../../axios/axios";
import {ErrorMessage} from '../../utils/util'
// import userAxios from '../../Axios/UserAxios'
// import { setCredentials } from "../../Redux/Auth/UserSlice";

function UserLogin() {

  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  // const [err,setErr]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()
      
const handleSubmit = async (e: SyntheticEvent)=>{
  e.preventDefault();
  console.log('formdata',email,password)
  if(email ==='' || password===''){
      // setErr('Please fill in all fields')
      return;
  }
  try {
    await userAxios
      .post(`/login`, { email, password })
      .then((res) => {
        if (res.data.error) {
          return ErrorMessage(res.data.message)
        }
        localStorage.setItem("userToken", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        dispatch(userLoggedIn(res.data.userData));
        navigate("/");
      })
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            // className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-100"
          >
            Login
          </button>
        </div>

      </form>
    </div>
  </div>
  )
}
// }

export default UserLogin