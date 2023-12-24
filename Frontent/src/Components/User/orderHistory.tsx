import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PAgination from "../../Components/pagination";


// import UserAxios from "../../Axios/UserAxios";
import { userAxios } from "../../axios/axios";
// import OrderTrack from "../../assets/orderTrack";
// import Loader from "../../assets/Loader";

function Orders() {
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;
  const [orderItem, setOrderItem] = useState([]);
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemData, setItemDta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate()
//   const user = useSelector((state) => state.user);
const user =useSelector((state)=>state.userAuth);
console.log(orderItem, 'orderItem in history');

const itemsPerPage = 5;
const totalPages = Math.ceil(orderItem.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = orderItem.slice(startIndex, endIndex);

const handlePageChange = (page) => {
  setCurrentPage(page);
};


  useEffect(() => {
    userAxios.get(`/getOrderHistory?id=${user.user._id}`).then((response) => {
      const items = response.data.orders;
      setOrderItem(items);
      setIsLoading(false)
    });
  }, [is_chage]);

  const openModal = (ele) => {
    setIsModalOpen(true);
    setItemDta(ele);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const cancelOrder = async (orderId, itemId) => {
    const result = await Swal.fire({
      title: "Do you really want to cancel this Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      UserAxios.patch("/cancelorder", {
        itemId,
        orderId,
        userId: user._id,
      }).then((response) => {
        setChange(!is_chage);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
    }
  };

  return (
    // <div className="p-10">
    <div className="bg-gray-50 p-10 flex flex-col">
      <div className="flex items-center justify-center pb-2 text-2xl font-semibold italic underline">
        <h1>Orders</h1>
      </div>
      <div className="border md:flex ">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
              <thead className=" bg-gray-100">
                <tr>
                 
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Total Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Payment Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                {orderItem?.map((item) => {
                  const formattedDate = new Date(
                    item.updatedAt
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <>
                    {item.item.length !== 0 &&
                      <Fragment>
                      <tr key={item._id}
                className="transition-all hover:bg-gray-50">

                  
                        
                        <td
                          className="flex px-6 py-2 whitespace-nowrap"
                        >
                          {formattedDate}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {item.item.length}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {item.paymentType}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                        {item.grandTotal}
                        </td>
                        
                        <td className="px-6 py-2 whitespace-nowrap flex justify-center">
                          {item.is_delivered ? (
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
                          ) : (item.grandTotal === 0)?(<h1 className="text-cherry-Red">Rejected</h1>):(
                            <h1>{"Pending"}</h1>
                          )}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                        <button   
                       className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400"

                          // className="bg-teal-500 border-none text-white"
             onClick={()=>navigate(`/orderItems/${item._id}`)}>View</button>
                        </td>
                      </tr>
                      {/* <OrderTrack
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        orderItem={itemData}
                      address={orderItem?.address}

                      /> */}
                    </Fragment>
                          }
                          </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="float- mr-3 mt-3">
     <PAgination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
   </div>
    </div>
   
  );
}

export default Orders;
