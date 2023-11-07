import React, {  useState } from 'react'
import axios from 'axios'
import {  } from 'react-redux';
import { USER_API } from '../../Constants/API';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorMessage } from '../../utils/util';


export default function Signup() {
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [phoneNumber,setPhoneNumber]=useState<number| string>('')


    const navigate=useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();


      console.log('Form Data:', {
    name,
    email,
    password,
    phoneNumber,
  });
        if(email.trim() === '' || password.trim() === '' || name.trim() === ''){
          return ErrorMessage("Please fill in all the required fields.");
      }
      if (phoneNumber !== null && phoneNumber.toString().length !== 10) {
        return ErrorMessage("Phone number must have exactly 10 digits.");
      }
         if(password.length < 6){
          // setError('password is too weak')
        return;
    }


   
        try{
            axios.post(`${USER_API}/register`,{email,password,name,phoneNumber})
            .then((res)=>{
              console.log(res.data);
              console.log(res.data.message)
              if (res.data.message ==='success'){
                alert('success');
                navigate('/login');
                return
              }
              alert(res.data.message);
            })
            .catch((err)=>{
              console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
 

<div className=" min-h-screen  flex items-center justify-center bg-white ">
 
    <div className="bg-white p-6 rounded-lg shadow w-96 mb-24">
    <ToastContainer toastClassName="toast" position="top-center" autoClose={5000} />

      <h2 className="my-heading">User Signup </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-bold">
          Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-bold">
          Email
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
            placeholder="Enter your Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-bold">
          PhoneNumber
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            // className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-blue-100"
          >
            Register
          </button>
        </div>
        {/* <Google/> */}


      </form>
      <div className="mt-4 ml-8 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-blue-600 hover:underline" href="/login">
                                Log in
                            </a>
                        </span>
                    </div>
    </div>
  </div>

       
  )
}
