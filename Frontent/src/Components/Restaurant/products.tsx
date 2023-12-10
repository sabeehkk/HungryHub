import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SwalAlert } from "../../utils/util";
import { restaurentAxios } from "../../axios/axios";
import PAgination from "../../Components/pagination";
import { ErrorMessage, SuccessMessage } from "../../utils/util";

function Products() {
  const [product, setProduct] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);
  const currentItems = product.slice();

  const restaurant = useSelector((state) => state.restaurentAuth);
  const restaurant_id = restaurant.restaurent?._id;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    restaurentAxios
      .get(`/getRestaurentProduct?id=${restaurant_id}`, { params: { page } })
      .then((response) => {
        setProduct(response.data.productData);
        const newSize = response.data.size;
        setSize(newSize);
        console.log(response.data, "productDataaaaaaa");
      });
  }, [page, is_deleted]);

  const filterPagination = (value) => {
    setPage(value);
  };

  const deletProduct = async (proId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      try {
        const response = await restaurentAxios.patch("/deleteProduct", {
          proId,
        });
        if (response.data.success) {
          SuccessMessage(response.data.message);
          setDeleted(!is_deleted); // Move this line here
        } else {
          ErrorMessage(response.data.message);
        }
      } catch (err) {
        ErrorMessage(err.response.data.message);
      }
    } else {
      ErrorMessage("Cancelled!!!");
    }
  };

  // const deletProduct = async (proId) => {
  //   const result = await SwalAlert();
  //   if (result.isConfirmed) {
  //    try {
  //      const response = await restaurentAxios
  //      .patch("/deleteProduct", { proId })
  //      if (response.data.success) {
  //       return SuccessMessage(response.data.message)
  //       setDeleted(!is_deleted);
  //     } else {
  //       return ErrorMessage(response.data.message)
  //     }
  //    } catch (err) {
  //     return ErrorMessage(err.response.data.message)
  //    }

  //   } else {
  //     return ErrorMessage("Cancelled!!!")
  //   }
  // };

  return (
    // <>
    //   {" "}
    //   <div className="text-center ">
    //     <h2 className="text-4xl font-bold italic text-black">{"Menu Items"}</h2>
    //   </div>
    //   <div className="p-10 w-full">
    //     <div className="border">
    //       <div className="h-full w-full">
    //         <div className="w-full overflow-x-auto">
    //           <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
    //             <thead className=" bg-gray-400 text-off-White ">
    //               <tr>
    //                 <th className="px-6 font-bold py-3 text-left text-xs  text-off-White uppercase tracking-wider">
    //                   PRODUCT
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
    //                   DESCRIPTION
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
    //                   Price
    //                 </th>

    //                 <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
    //                   Actions
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
    //                   Delete
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody className="bg-gray-100 divide-y divide-gray-200 border">
    //               {currentItems.map((item) => (
    //                 <tr key={item._id}>
    //                   <td className="flex px-6 py-2 whitespace-nowrap">
    //                     <img
    //                       src={item.images[0]}
    //                       alt=""
    //                       className=" h-14 w-14  mr-10 rounded-sm"
    //                     />
                        
    //                     {item.productName}
    //                   </td>
    //                   <td className="px-6 py-2 whitespace-nowrap">
    //                     {item.description}
    //                   </td>
    //                   <td className="px-6 py-2 whitespace-nowrap">
    //                     {item.variants[0]?.price }

    //                   </td>

    //                   <td className="px-6 py-2 whitespace-nowrap">
    //                     {
    //                       <div className="flex justify-between">
    //                         <button
    //                           // className="text-yellow hover:text-orange-500"
    //                           className= "bg-blue-500 text-white border-neutral-50  hover:text-black"
    //                           onClick={() =>
    //                             navigate(`/restaurent/editProduct/${item._id}`)
    //                           }
    //                         >
    //                           Edit Menu
    //                         </button>
    //                       </div>
    //                     }
    //                   </td>
    //                   <td className="px-6 py-2 whitespace-nowrap">
    //                     {
    //                       <div className="flex justify-between">
    //                         <button
    //                          className="bg-red-400 text-white border-neutral-50  hover:text-black"
                            
    //                           onClick={() => deletProduct(item._id)}
    //                         >
    //                           Delete
    //                         </button>
    //                       </div>
    //                     }
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //         {/* <div className="pt-10">
    //         <Button
    //           onClick={() => navigate("/restaurant/addproduct")}
    //           value={"Add Menu"}
    //           className={"w-40"}
    //         />
    //       </div> */}
    //         <div className="float-center  mt-3">
    //           <PAgination
    //             currentPage={currentPage}
    //             filterPagination={filterPagination}
    //             size={size}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div className="flex flex-col">
    <div className="-my-9 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="flex ml-60">
            <h1 className="ml-60 text-xl font-bold text-gray-800">{"Menu Items"} </h1>
          </div>
  
          <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  PRODUCT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border ">
              {currentItems.map((item, index) => (
                <tr key={item._id}
                className="transition-all hover:bg-gray-100">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center font-bold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="flex px-6 py-4">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="h-14 w-14 mr-10 rounded-sm"
                    />
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {item.variants[0]?.price}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status ? "Online" : "Offline"}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between">
                      <button
                        className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-blue-500 shadow-md hover:bg-blue-400"
                        onClick={() =>
                          navigate(`/restaurent/editProduct/${item._id}`)
                        }
                      >
                        Edit Menu
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between">
                      <button
                       className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-red-500 shadow-md hover:bg-red-400"
                        onClick={() => deletProduct(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="float-center mt-3">
            <PAgination
              currentPage={currentPage}
              filterPagination={filterPagination}
              size={size}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Products;
