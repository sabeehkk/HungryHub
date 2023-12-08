import React from "react";

import { Link } from "react-router-dom";
const img =
  "https://cdn.dribbble.com/users/34292/screenshots/5371308/expiredfailedpaymentvdrib.gif";
const PaymentFail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      {" "}
      <img
        src={img}
        alt="payment failed image"
        className="md:p-10 w-1/2 h-auto rounded-lg shadow-lg mb-4"
      />{" "}
      <Link to={"/"}>
        {" "}
        <button className="mx-5 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          {" "}
          Back to Home{" "}
        </button>{" "}
      </Link>{" "}
    </div>
  );
};

export default PaymentFail;
