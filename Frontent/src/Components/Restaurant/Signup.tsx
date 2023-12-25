import React, { useState } from "react";
import axios from "axios";
import {} from "react-redux";
import { RESTAURENT_API } from "../../Constants/API";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorMessage, SuccessMessage } from "../../utils/util";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | string>("");
  const [place, setPlace] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "" || name.trim() === "" || place.trim() === "") {
      return ErrorMessage("Please fill in all the required fields.");
    }
    
    if (phoneNumber !== null && phoneNumber.toString().length !== 10) {
      return ErrorMessage("Phone number must have exactly 10 digits.");
    }
    if (password.length < 6) {
      ErrorMessage("password is too weak");
      return;
    }

    try {
      axios
        .post(`${RESTAURENT_API}/register`, {
          email,
          password,
          name,
          phoneNumber,
          place
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.message);
          if (res.data.message === "success") {
            navigate("/restaurent/login");
            SuccessMessage(res.data.message);
            return;
          }
          ErrorMessage(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" min-h-screen  flex items-center justify-center bg-white ">
      <div className="bg-white p-6 rounded-lg shadow w-96 mb-24">
        <ToastContainer
          toastClassName="toast"
          position="top-center"
          autoClose={5000}
        />

        <h2 className="my-heading">Restaurent Signup </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold">
              PhoneNumber
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-bold">
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className=" px-4 py-2 border  focus:outline-none focus:ring focus:border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 white:placeholder-gray-400"
              placeholder="Enter your Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Register
            </button>
          </div>
          {/* <Google/> */}
        </form>
        <div className="mt-4 ml-8 text-grey-600">
          Already have an account?{" "}
          <span>
            <a className="text-blue-600 hover:underline" href="/restaurent/login">
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
