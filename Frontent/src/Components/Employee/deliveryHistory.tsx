/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { employeeAxios } from "../../axios/axios";
import { restaurentAxios } from "../../axios/axios";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { BiSolidChat } from "react-icons/bi";

function DeliveryHistoryItem() {
  const [deliveryHistory, setDeliveryHistory] = useState<any>();
  const employee = useSelector((state: any) => state.employeeAuth);
  const navigate = useNavigate();

  const ChatIcon = () => {
    return <BiSolidChat style={{ fontSize: "20px " }} />;
  };

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
      restaurentAxios.patch("/updateDeliveryStatus", {
        prodId: productId._id,
        orderId: orderId,
        orderStatus: orderStatus,
        employeeId: employee.employee._id,
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
      {deliveryHistory?.ordersDetails.map((delivery:any) => (
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
                    className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400 flex items-center"
                    onClick={() => {
                      handleChat(delivery._id);
                    }}
                  >
                    <ChatIcon /> <span className="ml-2">Chat</span>
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
