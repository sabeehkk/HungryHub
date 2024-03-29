import React, { useEffect, useState } from "react";
import { RESTAURENT_API } from "../../Constants/API.js";
import { Link } from "react-router-dom";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

const HomePageRestaurent = () => {
  const [restaurants, setrestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurent();
  }, []);

  const fetchRestaurent = async () => {
    try {
      const response = await fetch(`${RESTAURENT_API}/getRestaurents`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setrestaurants(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div>
        <h1 className="mt-2 font-sans font-bold flex items-center justify-center md:text-5xl text-xl text-gray-400">
          Most Featured Restaurant
        </h1>
        <div className="flex items-center justify-center pt-3 ">
          <span className="border border-t-2 border-amber-500 w-10"></span>
          <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
          <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
          <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link
            to={`/menu/${restaurant._id}`}
            key={restaurant._id}
            className="rounded-xl relative"
          >
            <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
              <p className="font-bold text-2xl px-2 pt-4">
                {restaurant.restaurantName}
              </p>
              <p className="px-2"></p>
              {/* <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button> */}
              <div className="mt-24 flex items-center">
                <AiFillClockCircle className="text-green-200 text-xl" />
                <h4 className="text-lg text-cherry-Red ml-2">12.30 - 1.00</h4>
              </div>
              <div className="flex items-center">
                <ImLocation2 className="text-blue-500 text-xl" />
                <h4 className="ml-2 text-lg text-white">
                  {restaurant.place}
                </h4>
              </div>
            </div>
            <img
              className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
              src={
                restaurant.profilePicture ||
                "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={`Restaurant: ${restaurant.restaurantName}`}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePageRestaurent;
