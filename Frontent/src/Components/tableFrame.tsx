import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/pagination";
import {  Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "./adminSidebar";

const demoImage =
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png";

import { AdminSideTableFrameProps } from "../models/models";
function TabelFrame({
  heading,
  data,
  handleAction,
  role,
  filterPagination,
  currentPage,
  size,
}: AdminSideTableFrameProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [actionData, setActionData] = useState({});

  const handleClick = (id: string, status: string, message: string) => {
    handleAction(id, status, message);
  };
  const handleModalButtonClick = (item, role) => {
    setActionData(item);
    setShowModal(true);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex ml-60">
                <h1 className="ml-60 text-xl font-bold text-gray-800">
                  {heading} Management
                </h1>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {modal FORM} */}
                  <>
                    {showModal
                      ? data && (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl ml-60 font-semibold text-center mx-auto">
                                      More Details
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
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex justify-center items-center">
                                      <img
                                        src={
                                          actionData?.profilePicture
                                            ? actionData.profilePicture
                                            : demoImage
                                        }
                                        alt="User"
                                        className="h-16 w-16 md:h-20 md:w-20 rounded-full"
                                      />
                                    </div>

                                    <div className="flex-col justify-center my-5">
                                      <p className="text-lg mb-2">
                                        Name:{" "}
                                        <span className="font-semibold">
                                          {actionData.name ||
                                            actionData.restaurantName}
                                        </span>
                                      </p>
                                      <p className="text-lg mb-2">
                                        Email:{" "}
                                        <span className="font-semibold">
                                          {actionData?.email}
                                        </span>
                                      </p>
                                      <p className="text-lg mb-2">
                                        Phone Number:{" "}
                                        <span className="font-semibold">
                                          {actionData?.phoneNumber}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-col justify-center my-5">
                                      <p className="text-lg mb-2">
                                        Created At:{" "}
                                        {actionData?.createdAt
                                          ? new Date(
                                              actionData?.createdAt
                                            ).toLocaleDateString()
                                          : ""}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        )
                      : null}
                  </>
                  {/* {MODAL END} */}
                </tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={item._id}>
                      {/* <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                item?.profilePicture
                                  ? item.profilePicture
                                  : demoImage
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.name || "" || item.restaurantName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              item.status
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {item.status ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                              onClick={() =>
                                handleClick(item._id, "unblock", "")
                              }
                              className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-green-500 shadow-md hover:bg-green-400"
                            >
                              UNBLOCK
                            </button>
                          ) : null}
                          <button
                            className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-blue-500 shadow-md hover:bg-blue-400"
                            onClick={() => handleModalButtonClick(item, role)}
                          >
                            More
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            filterPagination={filterPagination}
            size={size}
          />
        </div>
      </div>
    </>
  );
}

export default TabelFrame;
