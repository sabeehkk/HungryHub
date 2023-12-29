/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userAxios } from "../../axios/axios";
import { restaurentAxios } from "../../axios/axios";
import BillModal from "../../assets/billModa";
import PAgination from "../../Components/pagination";
import { USER_API } from "../../Constants/API";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage,SwalAlert } from "../../utils/util";

const baseUrl = USER_API;

function OrdersData() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [orderItem, setOrderItem] = useState([]);
  const [itemData, setItemDta] = useState({});
  const [is_chage, setChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;

  const restaurant = useSelector((state:any) => state.restaurentAuth);

  useEffect(() => {
    if (!restaurant.restaurent || !restaurant.restaurent._id) {
      return;
    } else {
      restaurentAxios
        .get(`/viewOrders?id=${restaurant.restaurent._id}`)
        .then((response) => {

          const items = response.data.orders;
          if (response.data.orders.length) {
            setOrderItem(items);
          } else {
            ErrorMessage('No Orders')
          }
        })
        .catch((err) => {
          ErrorMessage(err.response.data.message);
        });
    }
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderItem.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = orderItem.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (ele) => {
    setModalOpen(true);
    setItemDta(ele);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const cancelOrder = async (orderId, itemId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      userAxios
        .patch("/cancelorder", {
          itemId,
          orderId,
          userId: user._id,
        })
        .then((response) => {
          setChange(!is_chage);
          SuccessMessage(response.data.message);
        });
    }
  };
  return (
    <div className="flex flex-col">
      <BillModal
        isOpen={modalOpen}
        closeModal={closeModal}
        orderItem={itemData}
      />
      <div className="border flex">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex ml-60">
              <h1 className="ml-72 text-xl font-bold text-gray-800">
                {"Order"} Management
              </h1>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Payment Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                {currentItems.map((item, ind) => {
                  const formattedDate = new Date(
                    item.createdAt
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <React.Fragment key={item._id}>
                      <tr className="transition-all hover:bg-gray-100">
                        <td
                          className="px-6 py-2 whitespace-nowrap"
                          onClick={() => openModal(item)}
                        >
                          {ind + 1}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {item.paymentType}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {item.item.length}
                        </td>
                        <td className="text-yellow hover:text-amber-600">
                          {item.paymentStatus === "PAID"
                            ? "Delivered"
                            : "Processing..."}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {
                            <button
                              className="bg-teal-500 border-none text-white"
                              onClick={() =>
                                navigate(
                                  `/restaurent/ordersMoreView/${item._id}`
                                )
                              }
                            >
                              View
                            </button>
                          }
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="float- mr-3 mt-3">
        <PAgination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default OrdersData;
