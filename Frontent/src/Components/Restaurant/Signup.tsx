import React, {  useState } from 'react'
import axios from 'axios'
import {  } from 'react-redux';
// import {  Link, useNavigate } from "react-router-dom";
import { RESTAURENT_API } from '../../Constants/API';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email,setEmail] =useState('')
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
            axios.post(`${RESTAURENT_API}/register`,{email,password,name,phoneNumber})
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
                       Register Your Restaurent                     
                             </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                <form onSubmit={handleSubmit}>
                        <div>
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
                        </div>
                        <div className="mt-4">
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
                        </div>
                        <div className="mt-4">
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
                        </div>
                        <div className="mt-4">
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
       
  )
}



// import React,{useState} from "react";

// import axios from 'axios'

// import {RESTAURENT_API} from '../../Constants/API'

// import { useNavigate } from "react-router-dom";
// import { } from 'react-redux'

// export default function Signup (){
    
//     const [email,setEmail] =useState('')
//     const [password,setPassword]=useState("")
//     const [phoneNumber,setPhoneNumber]=useState("")
//     const [errors,setError]=useState<string>("")

//     const navigate =useNavigate()
 
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if(email.trim() === '' || password.trim() === '' || name.trim() === ''){
//             setError(["Please fill"]);
//            return;
//        }
//           if(password.length < 6){
//            // setError('password is too weak')
//          return;
//      }
//      if(phoneNumber.length !== 10){
//        // setError('number is wrong');
//        return;
//    }
//          try{
//              axios.post(`${RESTAURENT_API}/register`,{email,password,name,phoneNumber})
//              .then((res)=>{
//                console.log(res.data);
//                console.log(res.data.message)
//                if (res.data.message ==='success'){
//                  alert('success');
//                  navigate('/login');
//                  return
//                }
//                alert(res.data.message);
//              })
//              .catch((err)=>{
//                console.log(err);
//              })
//          } catch (error) {
//              console.log(error);
//          }
//      }
//    return (
//      <div>
//              <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
//                  <div>
//                      <a href="/">
//                          <h3 className="text-4xl font-bold text-black-600">
//                             Signup
//                          </h3>
//                      </a>
//                  </div>
//                  <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
//                  <form onSubmit={handleSubmit}>
//                          <div>
//                              <label
//                                  htmlFor="name"
//                                  className="block text-sm font-medium text-gray-700 undefined"
//                              >
//                                  Name
//                              </label>
//                              <div className="flex flex-col items-start">
//                                  <input
//                                      type="text"
//                                      name="name"
//                                      id="name"
//                                      placeholder="Enter your name"
//                                      value={name}
//                                      onChange={(e)=>setName(e.target.value)}
//                                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                      required
//                                />
//                              </div>
//                          </div>
//                          <div className="mt-4">
//                              <label
//                                  htmlFor="email"
//                                  className="block text-sm font-medium text-gray-700 undefined"
//                              >
//                                  Email
//                              </label>
//                              <div className="flex flex-col items-start">
//                                  <input
//                                      type="email"
//                                      name="email"
//                                      id="email"
//                                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                      placeholder="Enter your email"
//                                      value={email}
//                                      onChange={(e)=>setEmail(e.target.value)}
//                                      required
//                           />
//                              </div>
//                          </div>
//                          <div className="mt-4">
//                              <label
//                                  htmlFor="password"
//                                  className="block text-sm font-medium text-gray-700 undefined"
//                              >
//                                  Password
//                              </label>
//                              <div className="flex flex-col items-start">
//                                  <input
//                                      type="password"
//                                      name="password"
//                                      id="password"
//                                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                      placeholder="Enter your password"
//                                     value={password}
//                                     onChange={(e)=>setPassword(e.target.value)}
//                                     required
//                                />
//                              </div>
//                          </div>
//                          <div className="mt-4">
//                              <label
//                                  htmlFor="phonenumber"
//                                  className="block text-sm font-medium text-gray-700 undefined"
//                              >
//                                  PhoneNumber
//                              </label>
//                              <div className="flex flex-col items-start">
//                                  <input
//                                      type="tel"
//                                      id="phoneNumber"
//                                       name="phoneNumber"
//                                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                      placeholder="Enter your phone number"
//                                       value={phoneNumber}
//                                      onChange={(e)=>setPhoneNumber(e.target.value)}
//                                      required
//                               />
//                              </div>
//                          </div>
                        
                       
//                          <div className="flex items-center mt-4">
//                              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
//                                  Register
//                              </button>
//                          </div>
//                 {errors && <p className='text-red-600 text-center mt-2'>{errors} &nbsp;</p>}
 
//                          {/* <Link to={"/"}>
//               <p className=" text-gray-600 text-center hover:font-semibold">{errors ? `Have an account` : errors}</p>
//             </Link> */}
//                      </form>
                     
//                      <div className="mt-4 text-grey-600">
//                          Already have an account?{" "}
//                          <span>
//                              <a className="text-blue-600 hover:underline" href="/login">
//                                  Log in
//                              </a>
//                          </span>
//                      </div>
                   
//                  </div>
//              </div>
//          </div>




// )
// }