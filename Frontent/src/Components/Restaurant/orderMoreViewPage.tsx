import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SwalAlert } from "../../utils/util";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import PAgination from "../../Components/pagination";

import { restaurentAxios ,employeeAxios} from "../../axios/axios";
import BillModal from "../../assets/billModa";
import { USER_API } from "../../Constants/API";
import { ErrorMessage, SuccessMessage } from "../../utils/util";

const baseUrl = USER_API
function OrdersItems() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [itemData, setItemDta] = useState({});
  const [is_chage, setChange] = useState(false);
  const [is_statusUpdated, setStatusUpdated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [orderStatus,setOrderStatus] = useState()

  const [selectEmployee, setSelectEmployee] = useState()
  const { id } = useParams()
  let total = 0;
  const restaurant = useSelector((state) => state.restaurentAuth);
  useEffect(()=>{
    restaurentAxios.get(`/getOrderIterms?id=${id}`).then((response)=>{
      setOrderItem(response.data.orderItems)
    })
  },[is_chage,is_statusUpdated])
  useEffect(()=>{
    employeeAxios.get(`/listEmployees`).then((response)=>{
      setEmployees(response.data.listEmployees)
    })  
  },[])
  const openModal = (ele) => {
    setModalOpen(true);
    setItemDta(ele);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const updateDeliveryStatus = (prodId, orderStatus) => {
    const updateStatus = {
      prodId, 
      orderId:orderItem._id ,
      orderStatus,
     }  
    restaurentAxios.patch("/updateDeliveryStatus", {
      prodId, 
      orderId:orderItem._id,
      orderStatus,
    }).then((response) => {
      setStatusUpdated(!is_statusUpdated);
    });
  };

  const employeeDelivery = (employeeId, orderId) => {
    if (employeeId && orderId) {
      if (employeeId !== "all") {
        SuccessMessage('Selected employee');
        restaurentAxios.post("/splitOrder", { employeeId: employeeId, orderId: orderId })
      } else {
        ErrorMessage('Select a specific employee');
      }
    } else {
      ErrorMessage('Select employee and order');
    }
  };
  
  const cancelOrder = async (orderId,itemId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      restaurentAxios.patch("/cancelOrder", {
        itemId,
        orderId,
        userId:orderItem.userId
      }).then((response) => {
        setChange(!is_chage);
        SuccessMessage(response.data.message)
      });
    }
  };
  return (
    <div className=" flex flex-col">
  <BillModal isOpen={modalOpen} closeModal={closeModal} orderItem={itemData} />
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <div className="flex ml-60">
          <h1 className="ml-72 text-xl font-bold text-gray-800">
            {"More"} Details
          </h1>
        </div>
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
            <tr>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                PRODUCT
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                QUANTITY
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                RATE
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                PRICE
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select Employee
              
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Confirm
              </th>
              <th  scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                 Actions
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 border">
            {orderItem?.item?.map((ele, ind) => (
              <tr  className="transition-all hover:bg-gray-50" key={ele._id}>
                <td
                  className="px-6 py-4"
                  onClick={() => openModal(orderItem)}
                >
                  <img
                    src={ele.product?.images[0]}
                    alt=""
                    className="h-10 w-14 mr-10 rounded-sm"
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                {ele.product?.productName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {ele?.quantity}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {ele?.price}
                  <h1 hidden> {(total = total + ele.price)}</h1>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {ele.is_canceled ? (
                    <h1 className="text-cherry-Red">Order Rejected</h1>
                  ) : (
                    <select
                      className="bg-blue-500 border-none text-white cursor-pointer p-1 rounded"
                      value={ele.orderStatus}
                      onChange={(e) =>
                        updateDeliveryStatus(ele._id, e.target.value)
                      }
                      disabled={ele.orderStatus === "Delivered"}
                    >
                      <option
                        className="bg-white text-black hover:bg-gray-400"
                        value="Pending"
                      >
                        Accept
                      </option>
                      <option
                        className="bg-white text-black hover:bg-gray-400"
                        value="Preparing..."
                      >
                        Preparing...
                      </option>
                      <option
                        value="Packed"
                        className="bg-white text-black hover:bg-gray-400"
                      >
                        Packed
                      </option>
                   
                    </select>
                  )}
                </td>
                
                {/* {
                employees.map((employee, index) => (
                  <td key={index} className="px-6 py-2 whitespace-nowrap">
                    <h1>{employee?.name}</h1>
                  </td>
                ))
              } */}
              <td>
              <select 
              className="bg-blue-500 border-none text-white cursor-pointer p-1 rounded"
               id="employeeDropdown" onChange={(e)=>{setSelectEmployee(e.target.value)}}>
                <option
                className="bg-white text-black hover:bg-gray-400"
                 value="all">All Employees</option>
                {employees.map((employee, index) => (
                  <option
                   className="bg-white text-black hover:bg-gray-400"
                   key={index} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              </td>
              <td>
                <button
                       className="p-1 w-28  border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400"
                 onClick={()=>{employeeDelivery(selectEmployee,orderItem._id)}}>
                   confirm
                </button>
              </td>
              <td className=" px-6 py-4 whitespace-nowrap flex ">
                  {ele.orderStatus === "Delivered" ? (
                    <div className="bg-green-500 text-white rounded-full p-2">
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
                    <button className="text-cherry-Red">Order Rejected</button>
                  ) : (
                    <button
                      onClick={() => cancelOrder(orderItem._id, ele._id)}
                       className="p-1 w-20  border border-transparent text-white rounded bg-red-500 shadow-md hover:bg-red-400"
                   >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr className="px-6 py-2 whitespace-nowra justify-between items-end">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-lg  text-end font-semibold">Total  :   {total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="float- mr-3 mt-3">
     <PAgination
      />
   </div>
</div>
  );
}

export default OrdersItems;
