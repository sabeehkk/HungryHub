import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/user/authSlice';

function IsLogged() {
    const {success} = useSelector((state:any)=> state.userAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!success){
            navigate('/login')
        }
    },[success])

    useEffect(()=>{
        const token = localStorage.getItem("userToken")
        if(!token){
            dispatch(logout())
            navigate("/login")
        }
    })
  return  null
}

export default IsLogged