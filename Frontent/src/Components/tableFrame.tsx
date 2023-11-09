import React from 'react';
import { Link } from 'react-router-dom';

import {
  AdminSideRestaurentModel,
    AdminSideTableFrameProps
} from '../models/models'

function TableFrame  ({
    // heading,
    data,
    handleAction,
    // filterPagination,
    // currentPage,
    // size,
}:AdminSideTableFrameProps ){
      // const [id,setId]=useState("")
      // const [status,setStautus]= useState("")
    

      const handleClick =(id:string,status:string,message:string)=>{
        handleAction(id,status,message) ;
      };

      // const
      //  handleStatus =(id:string,status:string)=>{
      //   if(status==='reject'){
      //       setId(id)
      //       setStatus(status)
      //   }else
      //   {
      //     handleClick(id,status,"")
      //   }
      // }

      // const submitMessage =()=>{
      //   handleClick(id,status)
      // }

      return(
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
    {/* <table className="w-full table-fixed">
      <thead>
        <tr className="bg-gray-100">
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">#</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
          <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white">
       {data &&
       data.map((item:AdminSideRestaurentModel)=>(
        
        <tr key={item._id}>
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
       ))}
      
      </tbody>
    </table> */}
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data&& 
        data.map((item:AdminSideRestaurentModel,index:number) => (
          <tr key={item._id}>
            <td>{index+1}</td>
            <td>{item.email}</td>
            <td>{item.name}</td>
            <td className="px-4 py-2 text-center">
                    {item.status === true
                      ? "Active"
                      : item.status === false
                      ? "Inactive"
                      : item.status}
                  </td>
                  <td>
                  {item.status === true ? (
                        <button
                          onClick={() => handleClick(item._id, "block", "")}
                          className="m-5"
                        >
                        </button>
                      ) : item.status === false ? (
                        <button
                          onClick={() => handleClick(item._id, "unblock", "")}
                          className="m-5"
                        >
                        </button>
                      ) : null}
                  </td>
                  
            {/* <td>
              {item.status === true ? (
                <button className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                  Active
                </button>
              ) : (
                <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                  Inactive
                </span>
              )}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      )

   
}

export default TableFrame


