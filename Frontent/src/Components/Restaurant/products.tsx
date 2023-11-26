import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Button from "../../assets/Button";

import { restaurentAxios } from "../../axios/axios";
import PAgination from "../../Components/pagination";

import Pagination from "../../assets/pagination";

function Products() {
  const [product, setProduct] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);

  const restaurant = useSelector((state) => state.restaurentAuth);
  console.log(restaurant, "restaurent details");

  const restaurant_id = restaurant.restaurent._id;
  console.log(restaurant_id, "restIddd");

  const navigate = useNavigate();

  useEffect(() => {
    restaurentAxios
      .get(`/getRestaurentProduct?id=${restaurant_id}`)
      .then((response) => {
        setProduct(response.data.productData);
        console.log(response.data, "productDataaaaaaa");
      });
  }, [is_deleted]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(product.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product.slice(startIndex, endIndex);

  console.log(currentItems, "currentItemssss");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deletProduct = async (proId) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      restaurentAxios
        .patch("/deleteProduct", { proId })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setDeleted(!is_deleted);
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else {
      toast.error("Cancelled", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const filterPagination = (value) => {
    setPage(value);
  };

  return (
    <div className="p-10 w-full">
      <div className="border">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    DESCRIPTION
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    Price
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    Actions
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
          <div className="pt-10">
            <Button
              onClick={() => navigate("/restaurant/addproduct")}
              value={"Add Menu"}
              className={"w-40"}
            />
          </div>
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
  );
}

export default Products;
