import React, { useState } from "react";
// import { FiEye, FiSettings, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from "../Components/pagination";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import {
  AdminSideRestaurentModel,
  AdminSideTableFrameProps,
} from "../models/models";

function TabelFrame({
  heading,
  data,
  handleAction,
  role,
  filterPagination,
  currentPage,
  size,
}: AdminSideTableFrameProps) {
  // const [rejectedMessage, setRejectedMessage] = useState("");

  // const [id, setId] = useState("");
  // const [status, setStatus] = useState("");

  const [showModal, setShowModal] = React.useState(false);
  const [actionData,setActionData]=useState({})
  const navigate = useNavigate();

  const handleClick = (id: string, status: string, message: string) => {
    handleAction(id, status, message);
  };
  const handleModalButtonClick = (item, role) => {
    setActionData(item)
    // Navigate to the desired page
    setShowModal(true);

    // navigate(`/admin/${role}/${item._id}/more-details`);

    // Close the modal if needed
  };

  return (
    <div className="h-screen w-full bg-blue-200 p-8">
    <div className="max-w-screen-md mx-auto p-8 shadow-md rounded-lg bg-blue-100">
      <div className="w-full h-16 bg-blue-300 shadow-lg flex items-center justify-between px-6">
          <h1 className="ml-80 text-xl font-bold text-gray-800">
             {heading} Management  
          </h1>
          <div className="flex items-center"></div>
        </div>

        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>


            
            {/* {modal FORM} */}
            <>
              {showModal ? 
              data&&
                  (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold text-center mx-auto">
                            Details
                          
                          </h3>
                          <button
    className="p-1 ml-auto border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    onClick={() => setShowModal(false)}
>
    <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
        X
    </span>
</button>

                        </div>
                        {/*body*/}

                     

                        <h5></h5>
                        <div className="flex items-center">
       
          <img className="w-20 h-20 rounded-full" src= 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000' alt="" /> 
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{actionData.name||actionData.restaurantName }</h2>
          </div>
        </div>

                        <div className="relative p-6 flex-auto">

                        <div className="mb-4">
                                <p className="text-black-500 dark:text-black text-lg font-semibold">Name: {actionData.name||actionData.restaurantName}</p>
                                <p className="text-black-500 dark:text-black text-lg font-semibold">Email: Cait Genevieve   {actionData.email}</p>
                                <p className="text-black-500 dark:text-black text-lg font-semibold">Phone Number: {actionData.phoneNumber}</p>
                                <p className="text-black-500 dark:text-black text-lg font-semibold">Phone Number: {actionData.profilePicture}</p>
                               
                       </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        
                          <button  
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                           Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
            {/* {MODAL END} */}

            {data &&
              data.map((item , index) => (
                <tr className="hover:bg-gray-100" key={item._id}>
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="p-4 border-b border-gray-200">
                    {item.restaurantName || ""||item.name||"" }
                  </td>
                  <td className="text-center">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.status ? "bg-green-500" : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {item.status ? "Online" : "Offline"}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      {item.status === true ? (
                        <button
                          onClick={() => handleClick(item._id, "block", "")}
                          className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-red-500 shadow-md hover:bg-red-400"
                        >
                          BLOCK
                        </button>
                      ) : item.status === false ? (
                        <button
                          onClick={() => handleClick(item._id, "unblock", "")}
                          className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-green-500 shadow-md hover:bg-green-400"
                        >
                          UNBLOCK
                        </button>
                      ) : null}
                      <button
                        className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-blue-500 shadow-md hover:bg-blue-400"
                        // onClick={() => setShowModal(true)}
                        onClick={() => handleModalButtonClick(item, role)}
                      >
                        More
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          filterPagination={filterPagination}
          size={size}
        />
      </div>
    </div>
  );
}

export default TabelFrame;
