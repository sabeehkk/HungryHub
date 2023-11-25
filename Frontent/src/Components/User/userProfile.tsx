import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../redux/user/authSlice";
import { profileUploadCloudinery, updateProfileImage } from "../../api/userApi";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

const demoImage = "https://startitindia.com/Uploads/1552200708454494651.jpg";

function userProfile() {
  const { user } = useSelector((state: any) => state.userAuth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await profileUploadCloudinery(file);
      const response = result && (await updateProfileImage(user?._id, result));
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

  return (
    <>
      <div className="h-full mt-16 shadow-xl mr-16 ml-16">
        <div className="flex items-center justify-center">
          <span className="text-xl font-extrabold block">User Profile</span>
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
                src={user?.profilePicture ? user.profilePicture : demoImage}
                alt={`${user.name} `}
                onClick={() => fileInputRef.current.click()}
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
                <div className="absolute right-0 mt-2">
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-2 text-left w-full max-w-[130px] mt-9 pr-3 mr-22 text-white bg-gray-700 rounded-full hover:bg-gray-800 inline-block"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/profile/editPassword"
                    className="ml-0 block px-4 py-2 text-left w-full max-w-[140px] text-white bg-gray-700 rounded-full hover:bg-gray-800 inline-block mt-2"
                  >
                    Edit Password
                  </Link>
                </div>
              )}
            </div>
            <div className="rounded  shadow p-6">
              <div className="pb-6">
                <label className="font-semibold text-gray-700 block pb-1">
                  Name
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    value={user.name}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label className="font-semibold text-gray-700 block pb-1">
                  Email
                </label>
                <input
                  disabled
                  id="email"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="email"
                  value={user.email}
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
                  value={user.phoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default userProfile;
