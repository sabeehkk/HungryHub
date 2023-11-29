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
    <>
      {" "}
      <div className="text-center ">
        <h2 className="text-4xl font-bold italic text-black">{"Menu Items"}</h2>
      </div>
      <div className="p-10 w-full">
        <div className="border">
          <div className="h-full w-full">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
                <thead>
                  <tr>
                    <th className="px-6 font-bold py-3 text-left text-xs  text-off-White uppercase tracking-wider">
                      PRODUCT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
                      DESCRIPTION
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
                      Price
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-off-White uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 border">
                  {currentItems.map((item) => (
                    <tr key={item._id}>
                      <td className="flex px-6 py-2 whitespace-nowrap">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="h-10 w-10 mr-10"
                        />
                        {item.productName}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {item.description}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {item.price}
                      </td>

                      <td className="px-6 py-2 whitespace-nowrap">
                        {
                          <div className="flex justify-between">
                            <button
                              className="text-yellow hover:text-orange-500"
                              onClick={() =>
                                navigate(`/restaurent/editProduct/${item._id}`)
                              }
                            >
                              Edit Menu
                            </button>
                          </div>
                        }
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {
                          <div className="flex justify-between">
                            <button
                              className="px-6 py-2 text-red-600 hover:text-red-900"
                              onClick={() => deletProduct(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="pt-10">
            <Button
              onClick={() => navigate("/restaurant/addproduct")}
              value={"Add Menu"}
              className={"w-40"}
            />
          </div> */}
            <div className="float-center  mt-3">
              <PAgination
                currentPage={currentPage}
                filterPagination={filterPagination}
                size={size}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
