import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
  // const [modal, setModal] = useState(false);
  // const [rejectedMessage, setRejectedMessage] = useState("");

  // const [id, setId] = useState("");
  // const [status, setStatus] = useState("");

  const [showModal, setShowModal] = React.useState(false);

  const navigate = useNavigate();

  const handleClick = (id: string, status: string, message: string) => {
    handleAction(id, status, message);
  };
  const handleModalButtonClick = (item, role) => {
    // Navigate to the desired page
    setShowModal(true);

    // navigate(`/admin/${role}/${item._id}/more-details`);

    // Close the modal if needed
  };

  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <div className="max-w-screen-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
        <div className="w-full h-12 bg-gray-100 shadow-md flex items-center justify-between px-4">
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
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Modal Title
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                            I always felt like I could do anything. That’s the
                            main thing people are controlled by! Thoughts- their
                            perception of themselves! They're slowed down by
                            their perception of themselves. If you're taught you
                            can’t do anything, you won’t do anything. I was
                            taught I could do everything.
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Save Changes
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
              data.map((item, index) => (
                <tr className="hover:bg-gray-100" key={item._id}>
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="p-4 border-b border-gray-200">
                    {item.name || ""}
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
