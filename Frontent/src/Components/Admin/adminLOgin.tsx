import  {  useState,SyntheticEvent } from "react";

import { Link, useNavigate } from "react-router-dom";

 import axios  from "axios";

import { useDispatch } from "react-redux";
import { adminAxios } from "../../axios/axios";



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
    await adminAxios
      .post(`/login`, { email, password })
      .then((res) => {
        if (res.data.error) {
          // return ErrorMessage(res.data.message)
        }
        localStorage.setItem("userToken", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        // dispatch(userLoggedIn(res.data.userData));
        navigate("/");
      })
  } catch (error) {
    console.log(error);
  }
}
  return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //   <div className="bg-white p-8 rounded-lg shadow-md w-96">
  //     <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="mb-4">
  //         <label htmlFor="username" className="block text-gray-600">
  //           Username:
  //         </label>
  //         <input
  //           type="email"
  //           id="email"
  //           name="email"
  //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
  //           placeholder="Enter your email"
  //           value={email}
  //           onChange={(e)=>setEmail(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="password" className="block text-gray-600">
  //           Password:
  //         </label>
  //         <input
  //           type="password"
  //           id="password"
  //           name="password"
  //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
  //           placeholder="Enter your password"
  //           value={password}
  //           onChange={(e)=>setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="text-center">
  //         <button
  //           type="submit"
  //           // className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
  //           className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-100"
  //         >
  //           Login
  //         </button>
  //       </div>

  //     </form>
  //   </div>
  // </div>
  <section className="bg-gray-50 dark:bg-white-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white-900 dark:text-white">
      <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
      Flowbite
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 white:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-300 white:border-white-300 white:placeholder-gray-400 dark:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
              placeholder="email"
              value={email}
             onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-dark-300 dark:text-dark">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}

              className="bg-gray-50 border border-white-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 white:border-gray-600 dark:focus:ring-primary-600 white:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-sky-400 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
// }

export default UserLogin