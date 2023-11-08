import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUsers } from '../../redux/admin/userSlice'



function UsersList() {
    const [user,setUser]=useState([])
    const [update,setUserUpdate]=useState("")
    const dispatch=useDispatch();


    useEffect(()=>{
        
    })
    
  return (
    <div>usersList</div>
  )
}

export default UsersList