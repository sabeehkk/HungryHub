import React, { Fragment, useEffect, useState } from "react";
import { employeeAxios, userAxios } from "../../axios/axios";
import { restaurentAxios } from "../../axios/axios";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../utils/util";
import { useNavigate } from "react-router-dom";

function DeliveryHistoryItem() {
  const [deliveryHistory, setDeliveryHistory] = useState();
  const employee = useSelector((state) => state.employeeAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!employee.employee || !employee.employee._id) {
      return;
    } else {
      employeeAxios
        .get(`/getordersempl/?id=${employee?.employee?._id}`)
        .then((response) => {
          setDeliveryHistory(response.data);
        });
    }
  }, [employee]);
  const updateDeliveryStatus = (
    prodId: any,
    orderStatus: any,
    orderId: any
  ) => {
    const productId = prodId.find((e) => {
      return e.orderStatus == "Packed";
    });
    if (productId && orderStatus && orderId) {
      restaurentAxios
        .patch("/updateDeliveryStatus", {
          prodId: productId._id,
          orderId: orderId,
          orderStatus: orderStatus,
        })
        .then((response) => {
          setStatusUpdated(!is_statusUpdated);
        });
    } else {
      return ErrorMessage("no data available");
    }
  };
  const handleChat = (orderId: string) => {
    navigate(`/employee/employeeChat/?id=${orderId}`, { state: orderId });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delivery History</h2>
      {deliveryHistory?.ordersDetails.map((delivery) => (
        <Fragment key={delivery._id}>
          {delivery.item.map((deliveryItem: any) =>
            (deliveryItem &&
              delivery.employeeId === employee.employee._id &&
              deliveryItem.orderStatus == "Packed") ||
            deliveryItem.orderStatus == "Delivered" ? (
              <div
                key={deliveryItem._id}
                className="flex border items-center justify-between"
              >
                <div className="p-4 mb-4">
                  <div>
                    <strong>Order ID:</strong>{" "}
                    {delivery._id.toString().substr(-4)}
                  </div>
                  <div>
                    <strong>Date:</strong> {delivery.updatedAt}
                  </div>
                  <div>
                    <strong>Status:</strong> {deliveryItem.orderStatus}
                  </div>
                  <div>
                    <strong>Customer:</strong> {delivery.userId.name}
                  </div>
                  <div>
                    {/* <strong>Items Delivered:</strong> {deliveryItem.items.join(', ')} */}
                  </div>
                  <div>
                    <strong>Feedback:</strong> {deliveryItem.feedback}
                  </div>
                </div>
                <div>
                  <div>
                    <select
                      className="bg-blue-500 border-none text-white cursor-pointer p-1 rounded"
                      value={deliveryItem.orderStatus}
                      onChange={(e) =>
                        updateDeliveryStatus(
                          delivery.item,
                          e.target.value,
                          delivery._id
                        )
                      }
                      disabled={delivery.item.orderStatus === "Delivered"}
                    >
                      <option
                        value="Out of delivery"
                        className="bg-white text-black hover:bg-gray-400"
                      >
                        Out of delivery
                      </option>
                      <option
                        value="Delivered"
                        className="bg-white text-black hover:bg-gray-400"
                      >
                        Delivered
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400"
                    onClick={() => {
                      handleChat(delivery._id);
                    }}
                  >
                    Chat
                  </button>
                </div>
                <div className="bg-white text-white rounded-full p-2">
                  {/* <svg
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
                </svg> */}
                </div>
              </div>
            ) : null
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default DeliveryHistoryItem;
