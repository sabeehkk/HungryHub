import React from "react";

function userProfile() {
  return (
    <div className="h-full mt-16 shadow-xl mr-16 ml-16">
      <div className="flex items-center justify-center">
        <span className="text-xl font-extrabold block">User Profile</span>
      </div>

      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <span className="text-gray-600">
            This information is secret so be careful
          </span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              className="max-w-xs w-32 items-center border rounded-full"
              src="https://startitindia.com/Uploads/1552200708454494651.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="flex justify-end">
            <a
              href="#"
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              Edit
            </a>
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
                  value="Jane Name"
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
                value="example@example.com"
              />
              <span className="text-gray-600 pt-4 block opacity-70">
                Personal login information of your account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userProfile;
