import React from 'react'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import  { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { userAxios } from '../axios/axios';
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLoggedIn } from "../redux/user/authSlice";
import { ErrorMessage } from '../utils/util';


function GoogleAuthentication() {
    const navigate =useNavigate()
  const dispatch=useDispatch()

    // const GoogleSignin =async (token:any)=>{
        const GoogleSignin = async(token : any)=>{
        try {
            const data : any =jwtDecode(token)
            console.log(data);
            
            await userAxios.post(`/googleLogin`,data)
            .then((res)=>{
                localStorage.setItem("userToken", res.data.token);
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${res.data.token}`;
                dispatch(userLoggedIn(res.data.userData));
                navigate("/");
              }) 
              .catch((err)=>{
                return ErrorMessage(err.response.data.message)
              })
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <GoogleOAuthProvider clientId="1025416617728-mdbjd2n8h3ctovsre8ld0osgse2agfp2.apps.googleusercontent.com">

    <div className='flex mt-5 mx-5 rounded-full'>
    <GoogleLogin 
        onSuccess={(credentialResponse) => {
            // const details =jwt_decode(credentialResponse.credential)
            // console.log(details);
            GoogleSignin(credentialResponse.credential)
            console.log(credentialResponse)
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />

    </div>
    </GoogleOAuthProvider>

  )
}

export default GoogleAuthentication