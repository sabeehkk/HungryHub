import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../redux/restaurent/authSlice";
import {
  restoprofileUploadCloudinery,
  updateRestoProfileImage,
} from "../../api/restaurentApi";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Loading from "../../Components/loading";
const demoImage = "https://startitindia.com/Uploads/1552200708454494651.jpg";
const RestaurentProfile = () => {
  const restaurant = useSelector((state: any) => state.restaurentAuth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await restoprofileUploadCloudinery(file);
      const response =
        result &&
        (await updateRestoProfileImage(restaurant?.restaurent._id, result));
      response && setSelectedImage(result);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage, "selected imageee");
      const data = { profilePicture: selectedImage };
      dispatch(setProfile(data));
      setSelectedImage(null);
    }
  }, [selectedImage, setProfile]);

  useEffect(() => {
    setLoad(false);
  }, []);
  return load ? (
    <Loading />
  ) : (
    <div className="h-full mt-16 shadow-xl mr-16 ml-16">
      <div className="flex items-center justify-center">
        <span className="text-xl font-extrabold block">Restaurent </span>
      </div>
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="w-full p-8 mx-2 flex justify-center">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <img
              className="mx-auto rounded-full h-32 w-32 object-cover cursor-pointer"
              src={
                restaurant?.restaurent?.profilePicture
                  ? restaurant.restaurent.profilePicture
                  : demoImage
              }
              alt={`${restaurant.restaurent?.restaurantName} `}
              onClick={() => fileInputRef.current.click()}
            />
          </div>
          <div className="pb-6 flex items-center">
            <label className="ml-16 font-semibold text-gray-700 block pr-2">
              Name :
            </label>
            <input
              disabled
              id="username"
              className="border-1 rounded-r ml-"
              type="text"
              value={restaurant.restaurent?.restaurantName}
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="flex justify-end">
            <button
              onClick={toggleDropdown}
              className="px-2 py-2 mr-10  hover:bg-gray-100 rounded-full absolute "
               >
              <AiOutlineEdit size={25} />
            </button>
            {isDropdownOpen && (
              <div className="absolute  mt-4">
                <Link
                  to="/restaurent/orders"
                  className=" px-8 py-2 text-left w-full max-w-[130px] mt-9 pr-12 mr-1 text-white bg-gray-700 rounded-full hover:bg-gray-800 inline-block"
                >
                  Orders
                </Link>
              </div>
            )}
          </div>
          <div className="rounded  shadow p-6">
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-1">
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={restaurant.restaurent?.email}
              />
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-1">
                Mobile Number
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={restaurant.restaurent?.phoneNumber}
              />
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-1">
                Place
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={restaurant.restaurent?.place}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurentProfile;
