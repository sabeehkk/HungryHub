import React, {  useState } from 'react'
import axios from 'axios'
import {  } from 'react-redux';
// import {  Link, useNavigate } from "react-router-dom";
import { USER_API } from '../../Constants/API';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [errors, setError] = useState<string[]>([]);


    const navigate=useNavigate()


    // const user=useSelector((state)=>state.auth)
    // const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();


      console.log('Form Data:', {
    name,
    email,
    password,
    phoneNumber,
  });
        if(email.trim() === '' || password.trim() === '' || name.trim() === ''){
           setError(["Please fill"]);
          return;
      }
         if(password.length < 6){
          // setError('password is too weak')
        return;
    }
    if(phoneNumber.length !== 10){
      // setError('number is wrong');
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
    <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-black-600">
                           Signup
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                <form onSubmit={handleSubmit}>

                <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-bold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"

            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>
                        {/* <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                              />
                            </div>
                        </div> */}


                        {/* <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                         />
                            </div>
                        </div> */}

                         <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"

            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
                        {/* <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter your password"
                                   value={password}
                                   onChange={(e)=>setPassword(e.target.value)}
                                   required
                              />
                            </div>
                        </div> */}
                         <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-bold">
          Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"

            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

                        {/* <div className="mt-4">
                            <label
                                htmlFor="phonenumber"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                PhoneNumber
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                     name="phoneNumber"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter your phone number"
                                     value={phoneNumber}
                                    onChange={(e)=>setPhoneNumber(e.target.value)}
                                    required
                             />
                            </div>
                        </div>
                        */}
                         <div className="mb-4">
          <label htmlFor="phonenumber" className="block text-gray-600 font-bold">
          PhoneNumber
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"

            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            required
          />
        </div>
                      
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
               {errors && <p className='text-red-600 text-center mt-2'>{errors} &nbsp;</p>}

                        {/* <Link to={"/"}>
             <p className=" text-gray-600 text-center hover:font-semibold">{errors ? `Have an account` : errors}</p>
           </Link> */}
                    </form>
                    
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-blue-600 hover:underline" href="/login">
                                Log in
                            </a>
                        </span>
                    </div>
                  
                </div>
            </div>
        </div>
        // <div className="min-h-screen flex items-center justify-center bg-gray-100">
        //   <div className="bg-white p-8 rounded-lg shadow-md w-96">
        //     <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
        //     <form onSubmit={handleSumbit}>
        //       <div className="mb-4">
        //         <label htmlFor="email" className="block text-gray-600">
        //           Email:
        //         </label>
        //         <input
        //           type="email"
        //           id="email"
        //           name="email"
        //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        //           placeholder="Enter your email"
        //           value={email}
        //           onChange={(e)=>setEmail(e.target.value)}
        //         //   pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
        //         //   title="Please enter a valid email address"
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
        //         //   pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$"
        //         //   title="Password must be at least 4 characters long and contain at least one letter and one number"
        //           required
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="name" className="block text-gray-600">
        //         Name:
        //         </label>
        //         <input
        //           type="text"
        //           id="name"
        //           name="name"
        //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        //           placeholder="Enter your name"
        //           value={name}
        //           onChange={(e)=>setName(e.target.value)}
        //         //   pattern="^[A-Za-z\s]{2,}$"
        //         //   title="Please enter a valid name (minimum 2 characters, letters only)"
        //           required
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="name" className="block text-gray-600">
        //         PhoneNumber:
        //         </label>
        //         <input
        //           type="tel"
        //           id="phoneNumber"
        //           name="phoneNumber"
        //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        //           placeholder="Enter your phone number"
        //           value={phoneNumber}
        //           onChange={(e)=>setPhoneNumber(e.target.value)}
        //         //   pattern="^\d{10}$"
        //         //   title='Enter 10 digits'
        //           required
        //         />
        //       </div>
        //       <div className="text-center">
        //         <button
        //           type="submit"
        //           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        //         >
        //           Sign Up
        //         </button>
        //       </div>
        //       {errors && <p className='text-red-600 text-center mt-2'>{errors} &nbsp;</p>}
        //       <Link to={"/"}>
        //     <p className="my-2 cursor-pointer text-gray-600 text-center hover:font-semibold">{errors ? `Have an account` : errors}</p>
        //   </Link>
        //     </form>
        //   </div>
        // </div>
  )
}
