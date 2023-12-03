import React, { useState, useEffect } from "react";
// import {data} from '../../Components/User/data.js'
import { RESTAURENT_API } from "../../Constants/API.js";

interface Product {
  productName: string;
  productPrice: number;
  productImage?: string | null;
}

function Food() {
  const [foods, setFoods] = useState<Product[]>([]);
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${RESTAURENT_API}/productList`);
      console.log(response); // Log the entire response object to see its structure
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setFoods(data.data); // Assuming your data is wrapped in a 'data' property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-center ">
        Top Rated Menu Items
      </h1>
      {/* {Filter Row} */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* {Filter Type} */}
        <div>
          <p className=" ">Filter Types</p>
        </div>
        {/* {Fiter Price} */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] w-full"></div>
        </div>
      </div>
      {/* {display Images} */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {(() => {
          const items = [];
          for (let index = 0; index < foods.length; index++) {
            const item = foods[index];
            items.push(
              <div
                key={index}
                className="border shadow-lg rounded-lg hover:scale-105 duration-300"
              >
                <img
                  src={item.images[0]}

                  alt={item.productName}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="flex justify-between px-2 py-4">
                  <p className="font-bold">{item.productName}</p>
                  <p>
                    <span className="bg-orange-500 text-white p-1 rounded-full">
                    ₹ {item.variants[0]?.price}
                    </span>
                  </p>
                </div>
              </div>
            );
          }
          return items;
        })()}
      </div>
    </div>
  );
}

export default Food;
