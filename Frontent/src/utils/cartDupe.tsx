import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { userAxios } from "../axios/axios";
import { ErrorMessage } from "./util";

function Cart() {
  const navigate = useNavigate();
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;
  const [cartItem, setCartItem] = useState([]);
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isInProductListing = true;
  const { user } = useSelector((state: any) => state.userAuth);
  useEffect(() => {
    userAxios.get(`/getcart?id=${user._id}`).then((response) => {
      const items = response.data?.cartData?.items;
      setCartItem(items);
      setCartId(response.data.cartData);
      setIsLoading(false)
    });
  }, [is_chage]);
  const handleChangeQuantity = (id, variant, action) => {
    userAxios.patch("/changeQuantity", {
      itemId: id,
      cartId: cartId._id,
      action,
      variant,
    })
      .then((response) => {
        setChange(prevState => !prevState);
      })
      .catch((error) => {
        ErrorMessage(error.response.data.message)
      });
  };

  const cancelCartItem = async (id, variant) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
        userAxios.patch("/cancelcartitem", {
        itemId: id,
        cartId: cartId._id,
        variant,
      }).then((response) => {
        setChange(!is_chage);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
    }
  };

  const updateTotal = (amount, grandTotal) => {
    if (cartItem && cartItem.length) {
        userAxios.patch("/updateTotal", {
        cartId: cartId._id,
        amount,
        grandTotal,
      }).then((response) => {
        navigate("/checkout");
      });
    } else {
      console.log("error");
      toast.error("Your cart is empty", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-screen bg-gray-100 pt-20">
  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
      {/* Map through cart items and display each */}
      {cartItem?.map((item) => (
        <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={item.productId?.images[0]} alt="product-image" className="w-full h-28 object-cover object-center sm:w-40 md:w-40 rounded-lg" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{item.productId?.productName}</h2>
              <p className="mt-1 text-xs text-gray-700">{item.variant}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              {/* Quantity selector */}
              <div className="border border-lime-50 items-center justify-between flex">
            {isInProductListing ? (
      // Display total calculation only if isInProductListing is true
      <h1 className="hidden"> {(total = total + item.price)}</h1>
    ) : null}
            <button
                className="bg-slate-200 pl-3"
                onClick={() => {
                if (item.quantity > 1) {
                    handleChangeQuantity(item.productId?._id, item.variant, { decrement: true });
                } else {
                    cancelCartItem(item.productId?._id, item.variant);
                }
                }}
            >
                <span className="mr-2">-</span>
            </button>
            <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value={item.quantity}
                min="1"
                readOnly // Ensure that users can't manually edit the value
            />
            <button
                className="bg-slate-200 pr-3"
                onClick={() => {
                handleChangeQuantity(item.productId?._id, item.variant, { increment: true });
                }}
            >
                <span className="ml-2">+</span>
            </button>
            </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm">{parseFloat(item.price).toFixed(2)}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  onClick={() => cancelCartItem(item.productId?._id, item.variant)}
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
               
                
              </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
    
    <p hidden>{(grandTotal = total + charges - discount)}</p>

    
    {/* Subtotal and Checkout */}
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{parseFloat(total).toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">{charges}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Grand Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">{parseFloat(grandTotal).toFixed(2)} </p>
          <p className="text-sm text-gray-700">''</p>
        </div>
      </div>
      {/* Proceed to checkout button */}
      <button
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        onClick={() => {
          updateTotal(total, grandTotal);
        }}
      >
       Proceed To CheckOut
      </button>
   
    </div>
  </div>
</div>

  );
}

export default Cart;
