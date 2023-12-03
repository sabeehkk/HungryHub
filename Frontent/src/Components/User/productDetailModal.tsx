import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import UserAxios from "../../Axios/UserAxios";
import { userAxios } from "../../axios/axios";

const ProductDetailModal = ({ isOpen, close, item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.userAuth);

  const handleVariandSelection = (ind) => {
    setSelectedVariant(item.product.variants[ind]);
    toggleDropdown();
  };
  const closeModal = () => {
    close();
    setSelectedVariant({});
  };
  //  console.log(selectedVariant);
  const handleAddToCart = () => {
    if (selectedVariant.price) {
    const productId = item?.product._id;
    const userId = user._id;
    userAxios
      .post("/addToCart", { productId, userId,selectedVariant })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/cart");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  }else {
    toast.error("Please Select Size", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
  };
  return (
    <>
       {isOpen && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.productName}
                        className="object-cover h-72 w-96 object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {item.product.productName}
                      </h2>
                      <h2 className="text-xl font-bold text-gray-500 sm:pr-12">
                        {item.product.description}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <p className="text-2xl text-gray-900">{}</p>

                        <div className="relative mt-6">
                          <button
                            type="button"
                            onClick={toggleDropdown}
                            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                          >
                            Select Variant
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${
                                isDropdownOpen ? "" : "transform rotate-180"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {/* Dropdown content */}
                          {isDropdownOpen && (
                            <div
                              className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                              style={{ zIndex: 10 }}
                            >
                              {item.product.variants.map((option, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer text-left"
                                  onClick={()=>handleVariandSelection(index)}
                                >
                                  {option.name}{"  ₹"}{option.price}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>

                      <hr/>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                          <div className="text-sm font-medium text-gray-900">
                            <h4 className="text-sm font-medium text-gray-900">
                              Size : {selectedVariant.name}
                            </h4>
                            <h4 className="text-sm font-medium text-gray-900">
                              Price : {selectedVariant.price}
                            </h4>
                            <h4 className="text-sm font-medium text-gray-900">
                              Offer : {selectedVariant.offer} %
                            </h4>
                            <h4 className="text-sm font-medium text-gray-900">
                              Offer Price : {selectedVariant.offerPrice}
                            </h4>
                          </div>

                          {/* <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Size
                              </h4>
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Size guide
                              </a>
                            </div> */}

                            {/* <fieldset className="mt-4"> */}
                              {/* ... (sizes radio buttons) ... */}
                            {/* </fieldset> */}
                          {/* </div> */}

                          <button
                          onClick={() => {
                            handleAddToCart();
                           
                          }}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to Cart
                          </button>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailModal;
