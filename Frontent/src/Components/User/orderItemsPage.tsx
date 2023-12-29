/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { userAxios } from "../../axios/axios";
import OrderTrack from "../../assets/orderTrack";
import { useNavigate, useParams } from "react-router-dom";
import PAgination from "../../Components/pagination";
import { SuccessMessage, SwalAlert } from "../../utils/util";

function OrderItems() {
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;
  const [orderItem, setOrderItem] = useState<any>();
  const [is_chage, setChange] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemData, setItemDta] = useState<any>({});
  const navigate = useNavigate();
  const { ordId } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const user = useSelector((state:any) => state.userAuth);
  useEffect(() => {
    userAxios.get(`/orderItems?id=${ordId}`).then((response) => {
      const items = response?.data?.orderItems;
      setOrderItem(items);
    });
  }, [is_chage]);

  const handleChat = () => {
    navigate(`/userChat?id=${ordId}`, { state: ordId });
  };
  const openModal = (ele) => {
    setIsModalOpen(true);
    setItemDta(ele);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const cancelOrder = async (orderId, itemId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      userAxios
        .patch("/cancelOrder", {
          itemId,
          orderId,
          userId: user.user._id,
        })
        .then((response) => {
          setChange(!is_chage);
          SuccessMessage(response.data.message);
        });
    }
  };
  return (
    <div className="bg-gray-50 p-10 flex flex-col">
      <div className="flex items-center justify-center pb-2 text-2xl font-semibold italic underline">
        <h1>Order Items</h1>
      </div>
      <div className="border md:flex">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
              <thead className=" bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    RATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                <Fragment>
                  {orderItem?.item.map((ele) => (
                    <tr
                      key={ele._id}
                      className="transition-all hover:bg-gray-50"
                    >
                      <td
                        className="flex px-6 py-2 whitespace-nowrap"
                        onClick={() => openModal(ele)}
                      >
                        <img
                          src={ele.product?.images[0]}
                          alt=""
                          className="h-10 w-10 mr-10"
                        />
                        {ele.product?.productName}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {ele?.quantity}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {ele.product?.price}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {ele?.price}
                        <h1 hidden> {(total = total + ele.price)}</h1>
                      </td>
                      <td
                        className={`px-6 py-2 whitespace-nowrap ${
                          ele.orderStatus === "Delivered" &&
                          "flex justify-center"
                        } `}
                      >
                        {ele.orderStatus === "Delivered" ? (
                          <div className="bg-green-500 text-white rounded-full p-2 ">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                        ) : ele.is_canceled ? (
                          <button className="text-red-600 hover:text-red-900">
                            Rejected
                          </button>
                        ) : (
                          <button
                            onClick={() => cancelOrder(orderItem._id, ele._id)}
                            className="p-1 w-20  border border-transparent text-white rounded bg-red-500 shadow-md hover:bg-red-400"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="p-1 w-20  border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400"
                          onClick={() => {
                            handleChat();
                          }}
                        >
                          Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                  <OrderTrack
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    orderItem={itemData}
                    address={orderItem?.address}
                  />
                </Fragment>
                <tr className="px-6 py-2 whitespace-nowra justify-between items-end">
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold">Total:</td>
                  <td className="text-end text-lg font-semibold">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="float- mr-3 mt-3">
        <PAgination />
      </div>
    </div>
  );
}
export default OrderItems;
