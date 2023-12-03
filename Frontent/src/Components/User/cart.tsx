import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// import Button from "../../assets/Button";
// import UserAxios from "../../Axios/UserAxios";
import { userAxios } from "../../axios/axios";
// import Loader from "../../assets/Loader";

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
        setChange(!is_chage);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
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
    <div className="p-10">
      <div className="flex items-center justify-center pb-2 text-2xl font-semibold italic underline">
        <h1>Cart Items</h1>
      </div>
      <div className="border md:flex">
        <div className="h-full md:w-2/3">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-table-blue text-off-White">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    RATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    OFFER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
               
              <tbody className="bg-white divide-y divide-gray-200 border">
                {cartItem?.map((item) => (
                  <tr key={item._id}>
                    <td className="flex px-6 py-2 whitespace-nowrap">
                      <img
                        src={item.productId?.images[0]}
                        alt=""
                        className="h-10 w-10 mr-10"
                      />
                      {item.productId?.productName}
                      {" - "}
                      {item.variant}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                    <div className="border border-lime-50 items-center justify-between flex">
                        <button
                          className="bg-slate-200 pl-3"
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleChangeQuantity(
                                item.productId?._id,
                                item.variant,
                                {
                                  decrement: true,
                                }
                              );
                            } else {
                              cancelCartItem(item.productId?._id, item.variant);
                            }
                          }}
                        >
                          <span className="mr-2">-</span>
                        </button>
                        {item.quantity}
                        <button
                          className="bg-slate-200 pr-3"
                          onClick={() => {
                            handleChangeQuantity(
                              item.productId?._id,
                              item.variant,
                              {
                                increment: true,
                              }
                            );
                          }}
                        >
                          <span className="ml-2">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {/* {item.offer}% */}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {parseFloat(item?.price).toFixed(2)}
                      <h1 hidden> {(total = total + item.price)}</h1>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {
                        <button
                          onClick={() =>
                            cancelCartItem(item.productId?._id, item.variant)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      }
                    </td>
                  </tr>
                ))}
                <tr className="px-6 py-2 whitespace-nowra items-end">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold">Total:</td>
                  <td className="text-end text-lg font-semibold float-right">
                    {parseFloat(total).toFixed(2)}
                  </td>
                </tr>
              </tbody>
              
            </table>
          </div>
          <div className="">
            <button
              value={"continue shoping"}
              onClick={() => navigate("/")}
              className={"mt-28"}
            />
          </div>
        </div>
        <div className="p-3 md:w-1/3">
          <div className="border h-full w-full shadow-md ">
            <div className="space-y-4 p-4">
              <h1>
                Total:{" "}
                <span className="float-right">
                  {parseFloat(total).toFixed(2)}
                </span>
              </h1>
              <h1>
                Charges:<span className="float-right">{charges}</span>
              </h1>
              <h1>
                Discount: <span className="float-right">{discount}</span>
              </h1>
              <p hidden>{(grandTotal = total + charges - discount)}</p>
              <h1>
                Grand Total:{" "}
                <span className="float-right">
                  {parseFloat(grandTotal).toFixed(2)}
                </span>
              </h1>
            </div>
            <br />
            <br />
            <div>
            <button
            value="Proceed to checkout"   
            onClick={() => {
                updateTotal(total, grandTotal);
            }}
            className="mt-12 w-full"
            >
            Proceed to checkout
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
