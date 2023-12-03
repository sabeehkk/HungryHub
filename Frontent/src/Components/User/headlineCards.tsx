import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RESTAURENT_API } from "../../Constants/API.js";
import { Link } from 'react-router-dom';
import { userAxios } from "../../axios/axios";


// import ProductDetailModal from "./productDetailModal";

const HomePageRestaurent=()=> {
  const navigate = useNavigate();
  const [restaurants, setrestaurants] = useState([]);
  // const [categories, setCategories] = useState([]);
  const { catName } = useParams();
  console.log(restaurants,'restaurentsss');
  

useEffect(()=>{
  fetchRestaurent()
 },[])

const fetchRestaurent = async () => {
  try {
    const response = await fetch(`${RESTAURENT_API}/getRestaurents`);
    console.log(response); // Log the entire response object to see its structure
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched restareddata:", data);
    setrestaurants(data.data); // Assuming your data is wrapped in a 'data' property
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
    {restaurants.map((restaurant) => (
      <Link to={`/menu/${restaurant._id}`} key={restaurant._id} className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>{restaurant.restaurantName}</p>
          <p className='px-2'>{/* You can add more details here, e.g., categories, products, etc. */}</p>
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
        </div>
        <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src={restaurant.profilePicture || "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={`Restaurant: ${restaurant.restaurantName}`} />
      </Link>
    ))}
  </div>
  )
}

export default HomePageRestaurent