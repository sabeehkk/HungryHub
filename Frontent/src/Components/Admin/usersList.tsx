import React,{useEffect,useState} from 'react'
// import { useDispatch } from 'react-redux'
// import { addUsers } from '../../redux/admin/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsersData  } from '../../redux/admin/userSlice';


import TableFrame from '../tableFrame' ;

import axios from 'axios'


function UsersList() {

  // const {users}=>useSelector((state)=>state.users)
  const { users } = useSelector((state) => state.user);


  const dispatch =useDispatch()

  const action = async (id, status)=>{
    status =status===true ? false : true;
    try {
      await axios.get(`http://localhost:3000/admin/action/?id=${id}&status=${status}`)
      .then((res)=>{
          if(res.data.message ==='success'){
            dispatch(ChangeAccess({id, status}));
            return;
          }
          alert(res.data.message);
      })
      .catch((error)=>{
          console.log(error,' user status changing');
      })

    } catch (error) {
      console.log(error);
    }
  }

    // const [setUserList,setUser]=useState([])
    // const [update,setUpdate]=useState("")
    // const dispatch=useDispatch();


    // useEffect(()=>{
    //     getUserData()
    // },[update])


    // const getUserData = async()=>{
    //     const {userData }= await usersData()
    //     setUserList(userData);
    //     dispatch(addUsers(userData))
    // }
    


  return (

    <div className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <Link to='/admin/adduser' ><button className="rounded-md m-3 px-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400">
        Add User
      </button></Link>
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>
      <ul className="grid grid-cols-1 gap-4">
        {FilterData?.length ==0 ?'User data is not found!': FilterData?.map((item, index) => (
          <div key={item._id} className="border p-4 rounded-md shadow-md">
            <p className="text-green-800 font-semibold mb-1">
              User {index + 1}: {item.username}
            </p>
            <p className="text-gray-600 mb-2">Email: {item.email}</p>
            <div className="flex items-center space-x-4">
              {/* <Link
                className="text-yellow-600 hover:underline"
                to={`/admin/viewuserdetails/${item._id}`}
              >
                View Details
              </Link> */}
              <button
                className={`px-4 py-2 rounded ${item.status ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                  }`}
                onClick={()=> action(item._id, item.status)}
              >
                {item.status ? 'BLOCK' : 'UNBLOCK'}
              </button>
              <button
              className={`px-4 py-2 rounded ${item.status ? 'bg-red-600 text-white' : 'bg-yellow-500 hover:bg-black-700 text-white'}`}
                onClick={()=> Delete(item._id)}
              >Delete 
              </button>
            </div>
          </div>
        ))}
      </ul>

    </div>
  </div>

    /* future div*/



  //   <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
  //   <table className="w-full table-fixed">
  //     <thead>
  //       <tr className="bg-gray-100">
  //         <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
  //         <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
  //         <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Phone</th>
  //         <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
  //       </tr>
  //     </thead>
  //     <tbody className="bg-white">
  //       <tr>
  //         <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
  //         <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
  //         <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
  //         <td className="py-4 px-6 border-b border-gray-200">
  //           <button className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Active</button>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
  //         <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
  //         <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
  //         <td className="py-4 px-6 border-b border-gray-200">
  //           <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
  //         <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
  //         <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
  //         <td className="py-4 px-6 border-b border-gray-200">
  //           <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
  //         <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
  //         <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
  //         <td className="py-4 px-6 border-b border-gray-200">
  //           <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </div>
  )
}

export default UsersList