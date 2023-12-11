import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

import { restaurentAxios, userAxios } from "../../axios/axios";

const FilteredRestaurents = () => {
  const navigate = useNavigate();
  const [restaurants, setrestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const { catName } = useParams();
  console.log(restaurants,'restaruent information in state');
  useEffect(() => {
    userAxios.get("/getCategoryies").then((response) => {
      console.log(response.data, "responseDataaaaas");
      setCategories(response.data.categories);
    });
  }, []);

  useEffect(() => {
    let cateName;
    if (selectedOption) {
      cateName = selectedOption;
    } else {
      cateName = catName;
    }
  
    // Check if cateName is still falsy (null or undefined)
    const isCategorySelected = Boolean(cateName);
  
    if (isCategorySelected) {
      userAxios.get(`/getcatRestaurents?catName=${cateName}`).then((response) => {
        console.log(response.data);
        setrestaurants(response.data);
      });
    } else {
      // If no category is selected, get all restaurants
      restaurentAxios.get('/getRestaurents').then((response) => {
        console.log(response.data, 'restaurent information');
        setrestaurants(response.data);
      });
    }
  }, [selectedOption, catName]);
  

  // useEffect(() => {
  //   let cateName;
  //   if (selectedOption) {
  //     cateName = selectedOption;
  //   } else {
  //     cateName = catName;
  //   }
  //   const isCategorySelected = Boolean(cateName);
  //   if (isCategorySelected) {
  //   userAxios.get(`/getcatRestaurents?catName=${cateName}`).then((response) => {
  //     console.log(response.data);

  //     setrestaurants(response.data);
  //   });
  // } else {
  //   restaurentAxios.get('/getRestaurents').then((response) => {
  //     console.log(response.data, 'restaurent information');
  //     setrestaurants(response.data);
  // }, [selectedOption,catName]);

  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // setIsLoading(true)
  };
  return (
    <div className="flex">
      <div className="w-1/4 pl-4">
        <div className="py-8">
          <h1 className="font-sans font-bold text-2xl">Food Categories</h1>
          <div className="flex pt-4 ">
            <span className="border border-t-2 border-amber-500 w-10"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
          </div>
        </div>
        <div>
          {categories.map((cat, indx) => (
            <label key={indx} className="flex h-10 items-center">
              <input
                type="radio"
                name="category"
                value={cat._id.name}
                checked={selectedOption === cat._id.name}
                onChange={handleOptionChange}
                className="mr-4"
              />
              <span className="tracking-wide font-semibold text-lg opacity-50 font-mono">
                {cat._id.name}
              </span>
              <span className="ml-auto mr-3 font-semibold text-lg opacity-50 font-mono">
                ({cat.count})
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 w-3/4 ml-auto">
        <div className="py-10">
          <h1 className="font-sans font-semibold ml-8 flex items-center text-4xl">
            {/* {restaurants?.restaurants?.length}+ Restaurant */}
            {restaurants?.restaurants?.length || restaurants?.data?.length || 0}+ Restaurant

          </h1>
          <div className="flex items-center pl-8 pt-6 ">
            <span className="border border-t-2 border-amber-500 w-10"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
          </div>
        </div>
        <div className="container mx-auto px-8">
          <div className="text-3xl font-semibold mb-4 flex items-center justify-center"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* {restaurants?.restaurants?.|map((item) => ( */}
            {(restaurants?.restaurants || restaurants?.data || []).map((item) => (

              <div
                key={item._id}
                className="mb-10 cursor-pointer bg-white"
                onClick={() => navigate(`/menu/${item.restaurent._id}`)}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={
                      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt={item.name}
                    className="w-full h-44"
                  />
                </div>
                <div className="flex justify-between px-5 pb-5">
                  <h4 className="text-xl font-bold mt-2">
                    {item?.restaurent?.restaurantName}
                  </h4>
                  <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                    {/* {ratingsMap[item.restaurant._id] !== undefined ? (
                      <span>{ratingsMap[item.restaurant._id]}</span>
                    ) : (
                      "N/A"
                    )} */}
                  </h4>
                  <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <div className="px-5 pb-3">
                  <h4 className="text-lg text-gray-500">
                    {/* {item.restaurant.Place} */}
                  </h4>
                  <h4 className="text-lg text-gray-500">
                    {/* {item.restaurant.Address?.state} */}
                  </h4>
                </div>
                <hr />
                <div className="px-5 py-3 flex">
                  <div className="flex items-center justify-start">
                    <img
                      src={
                        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt={item.restaurent?.restaurantName}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <AiFillClockCircle className="text-green-900 text-xl" />
                      <h4 className="text-lg text-cherry-Red ml-2">
                        12.30 - 1.00
                      </h4>
                    </div>
                    <div className="flex items-center">
                      <ImLocation2 className="text-blue-700 text-xl" />
                      <h4 className="text-lg text-gray-500">
                        {/* {item.restaurant.Place} */}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredRestaurents;
