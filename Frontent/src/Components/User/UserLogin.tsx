import  {  useState,SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
  
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../redux/user/authSlice";
import { userAxios } from "../../axios/axios";
import {ErrorMessage} from '../../utils/util'
import '../../Pages/User/style.css'
import Google from '../../Components/googleLogin'

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
    <div className=" min-h-screen  flex items-center justify-center bg-white ">
    <div className="bg-white p-6 rounded-lg shadow w-96 mb-24">
      <h2 className="my-heading">Signing </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 font-bold">
            Username
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
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
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-blue-100"
          >
            Login
          </button>
        </div>
        <Google/>

      </form>
    </div>
  </div>
  )
}
// }

export default UserLogin