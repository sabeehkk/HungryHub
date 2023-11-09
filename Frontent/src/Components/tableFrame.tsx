import React, { useState } from "react";
// import { FiEye, FiSettings, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from "../Components/pagination";
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
  // const [modal, setModal] = useState(false);
  // const [rejectedMessage, setRejectedMessage] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (id: string, status: string, message: string) => {
    handleAction(id, status, message);
  };

 

  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <div className="max-w-screen-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
        <div className="w-full h-12 bg-gray-100 shadow-md flex items-center justify-between px-4">
          <h1 className="ml-80 text-xl font-bold text-gray-800">{heading} Management</h1>
          <div className="flex items-center">
            {/* <input
              type="text"
              className="rounded-full bg-gray-300 py-1 px-2 text-gray-800"
              placeholder="Search"
            /> */}
          </div>
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
    {data &&
      data.map((item, index) => (
        <tr className="hover:bg-gray-100" key={item._id}>
          <td className="px-4 py-2 text-center">{index + 1}</td>
          <td className="p-4 border-b border-gray-200">{item.name || ""}</td>
          <td className="text-center">
            <div className="flex items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${item.status ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
              {item.status ? 'Online' : 'Offline'}
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
              <Link
                className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-blue-500 shadow-md hover:bg-blue-400"
                to={`/admin/${role}/${item._id}/more-details`}
              >
                MORE
              </Link>
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
