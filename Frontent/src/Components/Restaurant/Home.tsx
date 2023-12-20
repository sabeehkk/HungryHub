// RestaurantDashboard.js

import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";

import { RiFileList3Fill } from 'react-icons/ri'
import { FaShopify } from 'react-icons/fa'
import { BiSolidUserAccount } from 'react-icons/bi'
// import RestaurantAxios from '../../Axios/RestaurantAxios';
import { restaurentAxios } from '../../axios/axios';
// import PieChart from '../../assets/PieChart';
import PieChart from '../../assets/pieChart';
import Chart from '../../assets/chart';

const RestaurantDashboard = () => {
  const [dashBordDatas,setDashBoardDatas] = useState()

const restaurant = useSelector((state) => state.restaurentAuth);
let result = restaurant.restaurent;
  const restId = result?._id;

  useEffect(()=>{
    // restaurentAxios.get('/dashboardData').then((response)=>{
    //   setDashBoardDatas(response.data)
    // }) 
     restaurentAxios.get(`/dashboardData?id=${restId}`).then((response)=>{
      setDashBoardDatas(response.data)

     })
  },[])
    
  return (
    <div className="container mx-auto p-4">
      <div className="w-full p-5 md:flex bg-off-White shadow-md">
        <div
          className={`h-28 p-4 md:w-1/3 shadow-md bg-cherry-Red rounded w-full md:mr-3 mb-3 cursor-pointer`}
        >
          <div className="space-y-2 flex justify-center items-stretch">
            <div className='h-20 w-20 mr-3 bg-green-100 rounded-full flex items-center justify-center '>

            <FaShopify className="h-16 w-16 text-green-500 "/> 
            </div>
            <div className=''>
            <h3 className="text-2xl font-semibold text-off-White text-center">
              {dashBordDatas?.totalSale[0]?.total}
            </h3>
            <h3 className="font-semibold text-off-White text-center opacity-50">
             Total Sales
            </h3>
            </div>
          </div>
        </div>
        <div
          className={`h-28 p-4 md:w-1/3 shadow-md bg-cherry-Red rounded w-full md:mr-3 mb-3 cursor-pointer`}
        >
          <div className="space-y-2 flex justify-center items-stretch">
            <div className='h-20 w-20 mr-3 bg-green-100 rounded-full flex items-center justify-center '>

            <RiFileList3Fill className="h-20 w-16 text-green-500 "/> 
            </div>
            <div className=''>
            <h3 className="text-2xl font-semibold text-off-White text-center">
              {dashBordDatas?.totalOrders[0]?.total}
            </h3>
            <h3 className="font-semibold text-off-White text-center opacity-50">
             Total Orders
            </h3>
            </div>
          </div>
        </div>

        <div
          className={`h-28 p-4 md:w-1/3 shadow-md bg-cherry-Red rounded w-full md:mr-3 mb-3 cursor-pointer`}
        >
          <div className="space-y-2 flex justify-center items-stretch">
            <div className='h-20 w-20 mr-3 bg-green-100 rounded-full flex items-center justify-center '>

            <BiSolidUserAccount className="h-20 w-16 text-green-500 "/> 
            </div>
            <div className=''>
            <h3 className="text-2xl font-semibold text-off-White text-center">
              {dashBordDatas?.totalUsers[0]?.total}
            </h3>
            <h3 className="font-semibold text-off-White text-center opacity-50">
             Total Users
            </h3>
            </div>
          </div>
        </div>
        
      </div>
      <div className='w-full'>
        <div className=''>
        <Chart totalSaleData={dashBordDatas?.totalSale}/>
        </div>
        {/* <div className='md:w-1/3 mr-3'>
        <PieChart/>
        </div> */}

      </div>
    </div>
  );
};

export default RestaurantDashboard;
