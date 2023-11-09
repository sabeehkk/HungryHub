import React from 'react';
import { Link } from 'react-router-dom';

import {
  AdminSideRestaurentModel,
    AdminSideTableFrameProps
} from '../models/models'

function TableFrame  ({
    heading,
    data,
    handleAction,
    role
}:AdminSideTableFrameProps ){
      const [id,setId]=useState("")
      const [status,setStautus]= useState("")

      const handleClick =(id:string,status:string,message:string)=>{
        handleAction(id,status,message) ;
      };

      const handleStatus =(id:string,status:string)=>{
        if(status==='reject'){
            setId(id)
            setStatus(status)
        }else{
          handleClick(id,status,"")
        }
      }

      const submitMessage =()=>{
        handleClick(id,status)
      }

      return(
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
    <table className="w-full table-fixed">
      <thead>
        <tr className="bg-gray-100">
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Phone</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
          <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
          <td className="py-4 px-6 border-b border-gray-200">
            <button className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Active</button>
          </td>
        </tr>
        <tr>
          <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
          <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
          <td className="py-4 px-6 border-b border-gray-200">
            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
          </td>
        </tr>
        <tr>
          <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
          <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
          <td className="py-4 px-6 border-b border-gray-200">
            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
          </td>
        </tr>
        <tr>
          <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
          <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
          <td className="py-4 px-6 border-b border-gray-200">
            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
      )

   
}

export default TableFrame


