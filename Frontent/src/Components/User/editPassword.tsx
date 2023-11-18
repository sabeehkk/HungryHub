import React,{useState} from 'react'
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import { updatePassword } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPassword() {
  const { user } = useSelector((state: any) => state.userAuth);
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      return ErrorMessage("Please fill all fields");
    }

    if (password?.newPassword !== password?.confirmPassword) {
      return ErrorMessage("New Password and Confirm Password do not match");
    }
    if (password?.currentPassword == password?.newPassword) {
      return ErrorMessage(
        "Current Password and New Password cannot be the same. Please enter a new password."
      );
    }
    const response = await updatePassword(user?._id, password)
         
    if (response) {
      SuccessMessage("Your Password has been successfully updated");
      navigate("/profile");
      return;
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className='text-black font-bold'  htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              minLength={7}
              value={password.currentPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              minLength={7}
              value={password.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              minLength={7}
              value={password.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-teal-500 text-white p-2 rounded hover:bg-teal-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditPassword