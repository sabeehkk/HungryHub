
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// import RestaurantAxios from "../Axios/RestaurantAxios";
import { restaurentAxios } from "../axios/axios";
import { ErrorMessage } from "../utils/util";

const BillModal = ({ isOpen, closeModal, orderItem }) => {

  console.log(orderItem,'orderitem in bill modal');
  

  const [resData, setResData] = useState({});
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [image, setImage] = useState([]);

  let total = 0;
  
  const referNum = orderItem?._id?.slice(-6)
  const formattedDate = new Date(
    orderItem.createdAt
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  console.log(orderItem);
//   const restaurant = useSelector((state) => state.restaurant);
const restaurant = useSelector((state) => state.restaurentAuth);


console.log(restaurant,'restaruent details in billmodal');


  const restaurant_id = restaurant.restaurent?._id;
  console.log(restaurant_id,'restaruent details');

  

  useEffect(() => {
    if (!restaurant.restaurent || !restaurant.restaurent._id) {
      return 
        }else{
          restaurentAxios.get(`/getResProfile?id=${restaurant_id}`).then(
            (response) => {
              setResData(response.data.restData);
              setAddress({
                street: response.data.restData?.Address?.street,
                city: response.data.restData?.Address?.city,
                state: response.data.restData?.Address?.state,
                postalCode: response.data.restData?.Address?.postalCode,
              });
              setImage(response.data.restData?.Image);
            }
          );
        }

        }, []);


  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay  " onClick={closeModal}></div>
      <div className=" bg-gray-200  modal-container border rounded ">
        <div className=" modal-content bg-off-White p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Hungry<span className="font-bold">Hub </span>
        </h2>
            <h2 className="text-lg font-bold mr-16">Billing Details...</h2>
            <button className="border-none text-gray-600" onClick={closeModal}>
              <span className=" text-3xl">×</span>
            </button>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
          <div className="embed-container flex justify-between">
            <div>
              <div className="flex">
                <h1 className="text-xl font-bold">{resData.restaurantName}</h1>
                <h1 className="italic font-semibold">{resData.Place}sdkfaslkdf</h1>
                <h1 className="italic font-semibold">{address.city}skdfadl</h1>
                <h1 className="italic font-semibold">{address.postalCode}lolooooooooooooo</h1>
                <h1 className="italic font-semibold">{resData.phoneNumber}</h1>
              </div>
              <div className="pt-7">
                <h1 className="text-sm font-bold">Billing Address.</h1>
                <div>
                  {orderItem && orderItem.address && orderItem.address[0] ? (
                    <div>
                      <h1 className="italic">{orderItem.address[0].street}</h1>
                      <h1 className="italic">{orderItem.address[0].city}</h1>
                      <h1 className="italic">{orderItem.address[0].state}</h1>
                      <h1 className="italic">
                        {orderItem.address[0].postalCode}
                      </h1>
                    </div>
                  
                  ) : (
                    <div>Address information not available.</div>
                  )}
                </div>
              </div>
              <h1 className="font-bold">Payment Type :</h1>
              <h1 className=" ">{orderItem.paymentType}</h1>

            </div>
          

                      
            <div className="justify-between font-semibold italic">
              <div>
              <div className="border shadow-md p-3">
                <h1 >Reference No.: {referNum}</h1>
                <h1 >Invoice Date: {formattedDate}</h1>
              </div>
              <div className="pt-7">
                <h1 className="text-sm font-bold">Carrier.</h1>
                <div>
                  {orderItem && orderItem.employeeId && orderItem.employeeId ? (
                    <div>
                      <h1 className="italic">Name : {orderItem.employeeId.Name}</h1>
                      <h1 className="italic">Contact : {orderItem.employeeId.Mobile}</h1>
                    </div>
                  ) : (
                    <div>Address information not available.</div>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
          <div className="template-text mt-4">
            <div className="container mx-auto">
              <table className="min-w-full bg-gray-50 border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Sl</th>
                    <th className="py-2 px-4 border-b text-left">Item</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                    <th className="py-2 px-4 border-b text-left">Rate</th>
                    <th className="py-2 px-4 border-b text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem?.item?.filter((data) => data.product !== null).map((item) => (
                          <tr key={item._id}>
                            <td className="py-2 px-4 border-b">#</td>
                            <td className="py-2 px-4 border-b">{item.product?.productName}</td>
                            <td className="py-2 px-4 border-b">
                            {item?.quantity}
                            </td>
                            <td className="py-2 px-4 border-b">
                            {item.product?.price}
                            </td>
                            <td className="py-2 px-4 border-b">
                            {item?.price}
                            <h1 hidden> {(total = total + item.price)}</h1>
                            </td>
                          </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-4 border-b" colSpan="3">
                      Total Price:
                    </td>
                    <td className="py-2 px-4 border-b">{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
