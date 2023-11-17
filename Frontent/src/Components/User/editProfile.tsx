import React, { useState } from "react";
import { ErrorMessage, SuccessMessage,validateEmail } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../../api/userApi";
import { updateData } from "../../redux/user/authSlice";
import { useDispatch ,} from "react-redux";
import { profileEditModal } from "../../models/models";

const EditProfile = ({ data }) => {

  const [user, setUser] = useState<profileEditModal>({
    _id: data?._id || "",
    name: data?.lastName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    place: data?.place || "",
  
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
    
      email,
      phoneNumber,
     
    }: profileEditModal = user;

    // if (
    //   !name ||
    //   !email ||
    //   !phoneNumber ||
    // ) {
    //   return ErrorMessage("Please fill all fields");
    // }
    const emailResult = validateEmail(email);

    if (!emailResult) {
      return ErrorMessage(" Email address is incorrect");
    }

    if (typeof phoneNumber === "string" && phoneNumber.trim().length !== 10) {
      return ErrorMessage(
        "The phone number is not valid; please check your phone number"
      );
    }

   
    const data = {
      name,
      email,
      phoneNumber,
     
    };

    const response = await updateProfileData(data, user?._id);
    if (response) {
      SuccessMessage("Your profile has been successfully updated");
      dispatch(updateData(data));
      navigate("/profile");
      return;
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/** Input Fields */}
          <div>
            <label htmlFor="name" className="text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user?.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              minLength={10}
              maxLength={10}
              value={user?.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
         
        
       
         
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
