/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAxios } from "../../axios/axios";
import AddressModal from "../../assets/addressModal";
import { makePayment } from "../../api/userApi";
import { ErrorMessage, SuccessMessage } from "../../utils/util";

const Checkout = (initPayment) => {
  const [payment, setPayment] = useState("COD");
  const [is_change, set_change] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartData, setCartData] = useState<any>();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const users = useSelector((state: any) => state.userAuth);

  
  const handleSelectChange = (index) => {
    setSelectedAddressIndex(index);
  };

  const [address, setAddress] = useState([
    {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const navigate = useNavigate();
  const user = useSelector((state:any) => state.userAuth);
  useEffect(() => {
    userAxios.get(`/getUserData?id=${user.user._id}`).then((response) => {
      setAddress(response?.data?.user?.Address);
    });
  }, [is_change]);

  useEffect(() => {
    userAxios.get(`/getCart?id=${user.user._id}`).then((response) => {
      const items = response.data;
      console.log(items, "items in checkout page");
      setCartData(response.data.cartData);
    });
  }, [is_change]);

  const handleSaveAddress = (userId) => {
    let result = userId;
    if (
      newAddress.street.trim().length === 0 ||
      newAddress.city.trim().length === 0 ||
      newAddress.state.trim().length === 0 ||
      newAddress.postalCode.trim().length === 0
    ) {
      ErrorMessage("Please fill all field");
    } else {
      userAxios
        .patch("/addAddress", { id: userId, address: newAddress })
        .then((response) => {
          if (response) {
            set_change(!is_change);
            SuccessMessage(response.data.message);
          } else {
            ErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          ErrorMessage(error.response.data.message);
        });
    }
    setIsModalOpen(false);
  };

  const handlePaymentRadio = (payMethod) => {
    setPayment(payMethod);
  };
  const placeOrder = async (payment) => {
    if (selectedAddressIndex == null) {
      ErrorMessage("Please select address");
    } else if (payment === "COD" || payment === "Wallet") {
      userAxios
        .post("/order", {
          payment,
          addressIndex: selectedAddressIndex,
          cartData,
        })
        .then((response) => {
          if (response.data.data) {
            initPayment(response.data.data);
          } else {
            SuccessMessage(response.data.message);
            navigate("/OrderSuccess");
          }
        })
        .catch((err) => {
          ErrorMessage(err.response?.data?.message);
        });
    } else if (payment === "Online") {
      const url = await makePayment({
        payment,
        addressIndex: selectedAddressIndex,
        cartData,
      });
      if (url) {
        window.location.href = url;
        return;
      }
    }
  };
  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <div className="mb-4 space-y-3">
            {cartData?.items && cartData.items.length > 0 && (
              <div className="space-y-3">
                {cartData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      src={item.productId.images[0]}
                      alt={`Product ${index + 1}`}
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.productId.productName}
                      </span>
                      <span className="float-right text-gray-400">
                        {item.productId.description}
                      </span>
                      <p className="mt-auto text-lg font-bold">
                        ₹ {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-10 border border-gray-300 p-4 rounded-md shadow-md md:w- mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              Choose a Payment Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={"COD"}
                  name="selectPayment"
                  checked={payment === "COD"}
                  onChange={() => handlePaymentRadio("COD")}
                  id="payment_radio_COD"
                  className="form-radio text-indigo-600 h-5 w-5"
                />
                <span className="text-gray-900">COD</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={"Online"}
                  name="selectPayment"
                  checked={payment === "Online"}
                  onChange={() => handlePaymentRadio("Online")}
                  className="form-radio text-indigo-600 h-5 w-5"
                />
                <span className="text-gray-900">Online</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={"Wallet"}
                  name="selectPayment"
                  checked={payment === "Wallet"}
                  onChange={() => handlePaymentRadio("Wallet")}
                  className="form-radio text-indigo-600 h-5 w-5"
                />
                <span className="text-gray-900">Wallet</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <div className="">
            <div className="relative"></div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="w-full lg:p-10 leading-loose">
              <label className="block text-sm font-medium text-gray-700 underline">
                Select Address:
              </label>
              <div className="relative">
                <select
                  value={
                    address.length === 1
                      ? 0
                      : selectedAddressIndex !== -1
                      ? selectedAddressIndex
                      : ""
                  }
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-left"
                  style={{ direction: "rtl", textAlign: "left" }}
                >
                  {address.length === 1 && (
                    <option value={0} selected>
                      {`${users?.user?.name || ""} ,${address[0]?.street}, ${
                        address[0]?.city
                      }, ${address[0]?.state}, ${address[0]?.postalCode}`}
                    </option>
                  )}
                  {address.length > 1 && (
                    <option value="" disabled hidden>
                      Select an address
                    </option>
                  )}
                  {address?.map((elem, index) => (
                    <option
                      style={{ textAlign: "left" }}
                      key={index}
                      value={index}
                    >
                      {`${users?.user?.name || ""} ,${elem?.street}, ${
                        elem?.city
                      }, ${elem?.state}, ${elem?.postalCode}`}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3l7 7-7 7-7-7 7-7 7 7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 lg:ml-2 h-screan">
              <button
                style={{
                  backgroundColor: "#3498db",
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Add Address
              </button>
              <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                address={newAddress}
                onSave={handleSaveAddress}
                setNewAddress={setNewAddress} isEditing={undefined} setEditedAddress={undefined} editedAddress={undefined} index={undefined}              />
            </div>
            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="font-semibold text-gray-900">
                  ₹ {cartData?.total}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Charges</p>
                <p className="font-semibold text-gray-900">₹ {0}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Discount</p>
                <p className="font-semibold text-gray-900">
                  ₹ {cartData?.discount}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">Grand Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹ {cartData?.grandTotal}
              </p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={() => placeOrder(payment)}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
