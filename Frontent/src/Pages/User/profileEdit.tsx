import React from 'react'
import ProfileEdit from '../../Components/User/editProfile'
import { useSelector } from 'react-redux';

function profileEdit() {
    const {user}=useSelector((state:any)=>state?.userAuth)
  return user && <ProfileEdit data={user}/>
}

export default profileEdit