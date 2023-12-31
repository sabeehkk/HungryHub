import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import axios from "axios";
import { adminLoggedIn } from "../../redux/admin/authSlice";
import { useDispatch } from "react-redux";
import { adminAxios } from "../../axios/axios";

function AdminLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("formdata", email, password);
    if (email === "" || password === "") {
      ErrorMessage("Please fill in all fields");
      return;
    }
    try {
      await adminAxios.post(`/login`, { email, password }).then((res) => {
        console.log(res.data);

        if (res.data.error) {
          return ErrorMessage(res.data.message);
        }
        localStorage.setItem("adminToken", res.data?.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        dispatch(adminLoggedIn(res.data.AdminData));
        navigate("/admin");
        SuccessMessage(res.data.message);
      });
    } catch (error) {
      console.log(error);
      ErrorMessage(error.message);
    }
  };
  return (
    <div className=" min-h-screen  flex items-center justify-center bg-white ">
      <div className="bg-white p-6 rounded-lg shadow w-96 mb-24">
        <h2 className="my-heading"> Admin Login </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-bold">
              Username
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
