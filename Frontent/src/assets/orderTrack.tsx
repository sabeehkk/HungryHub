/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StarRating from "./starRating";

// import UserAxios from "../Axios/UserAxios";

import { userAxios } from "../axios/axios";

import { useSelector } from "react-redux";

const OrderTrack = ({ isOpen, closeModal, orderItem ,address }) => {

  console.log(address,'address in track');
  
        
  const [trackingStatus, setTrackingStatus] = useState<any>([]);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");

  const user = useSelector((state:any) => state.userAuth);
  useEffect(() => {

    const steps = ["Preparing...", "Packed", "Out of delivery", "Delivered"];
    const updatedTrackingStatus = steps.map((step, index) => {
      const completed =
        orderItem.orderStatus === step ||
        index < steps.indexOf(orderItem.orderStatus);
      return { step, completed };
   });
    setTrackingStatus(updatedTrackingStatus);
  }, [orderItem.orderStatus]);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  console.log(orderItem,'orderItemsUpdated');
  
  const ratingAndClose = async () => {
    const restId = orderItem.product.restaurent_id
    try {
      if (userRating > 0) {
        const response = await userAxios.patch("/rating", {
          userId: user.user._id,
          rating: userRating,
          restId,
        });
        if (response.data.success) {
          setUserRating(0);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const reviewAndClose = async()=>{
    const restId = orderItem.product.restaurent_id;
    try {
      if(review.length > 0){
        const response = await userAxios.patch("/review", {
          userId: user.user._id,
          review,
          restId,
        });
        if (response.data.success) {
          setUserRating(0);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }

  const handleRatingAndReview = () => {
    ratingAndClose();
    reviewAndClose();
  };

  return ( 
    <div
      className={`absolute inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
      style={{ overflow: "auto" }}
    >
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="bg-gray-200 modal-container border rounded md:w-2/3 w-full">
        <div className="modal-content bg-off-White p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl px-2 ">
          Hungry<span className="font-bold ">Hub </span>
        </h2>
            <h2 className="text-lg font-bold mr-16">Order Status...</h2>
            <button className="text-gray-600 border-none" onClick={closeModal}>
              <span className="text-3xl">×</span>
            </button>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
          <div className="embed-container flex justify-between items-center">
            <div>
              <div>
                <h1 className="text-xl font-bold underline ">Order Item Detail</h1>
                <h1 className="italic font-semibold">Product : {orderItem?.product?.productName}</h1>
                <h1 className="italic font-semibold">Size : {orderItem?.variant}</h1>
                <h1 className="italic font-semibold">Quantity : {orderItem?.quantity}</h1>
                <h1 className="italic font-semibold">Price : ₹ {parseFloat(orderItem?.price).toFixed(2)}</h1>
                
              </div>
              <div className="pt-7">
  <h1 className="text-sm font-bold">Billing Address.</h1>
  
  {address
    ? (
      <div>
        Address: {`${address[0]?.street}, ${address[0]?.city}, ${address[0]?.state}, ${address[0]?.postalCode}`}
      </div>
    )
    : (
      <div>
        Address information not available
      </div>
    )
  }
</div>
            </div>
            {trackingStatus[3]?.completed ? (

            <div className="border p-3 shadow-md w-auto">
                <div>
                  <h2>Rate this item:</h2>
                  <StarRating
                    totalStars={5}
                    onRatingChange={handleRatingChange}
                  />
                  <textarea
                    placeholder="Write your review..."
                    value={review}
                    onChange={handleReviewChange}
                    rows={5}
                    cols={50}
                  />
                </div>
                <button
                 className="text-green-500 "
                  onClick={handleRatingAndReview}>Submit</button>
            </div> 
              ) : null}
            <div className="border p-3 justify-between shadow-md">
            <img
                className="h-32 w-36"
                src={orderItem.product?.images[0]}
                alt=""
              />
            </div>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
              <h1 className="text-xl font-bold underline ">Order Status</h1>
          <div className="embed-container md:flex justify-between items-center border">
            <div className="max-w-xl mx-auto my-5">
              <div className="flex justify-center">
                {trackingStatus.map((status, index) => (
                  <div key={index} className="flex items-center">
                    {status.completed ? (
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
                    ) : (
                      <div className="border-2 border-gray-300 rounded-full p-2">
                        {index !== 0 && (
                          <div className="h-1 w-10 bg-gray-300"></div>
                        )}
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {status.step}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;
