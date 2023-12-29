/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { restaurentAxios } from "../../axios/axios";
import CategoryModal from "../../Components/Restaurant/categoryModal";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import PAgination from "../../Components/pagination";
import { SwalAlert } from "../../utils/util";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const currentItems = categories.slice();
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const activeEditMode = () => {
    setEditMode(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const editCategory = (catId: any, catName: any) => {
    setCategoryId(catId);
    setCategoryToEdit(catName);
    activeEditMode();
    openModal();
  };
  const filterPagination = (value) => {
    setPage(value);
  };
  useEffect(() => {
    categoryData();
  }, [is_deleted, showModal, page]);

  const restaurant = useSelector((state:any) => state.restaurentAuth);
  let result = restaurant.restaurent;
  const restId = result?._id;

  const categoryData = async () => {
    console.log("inside categoryData");
    const response = await restaurentAxios.get(`/getCategory?id=${restId}`, {
      params: { page },
    });
    const data = response.data;
    if (data) {
      setCategories(data.categoryData);
      const newSize = data.size < 1 ? 1 : data.size;
      setSize(newSize);
    }
  };

  const deleteCategory = async (catId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      try {
        const response = await restaurentAxios.patch("/deleteCategory", {
          catId,
        });
        if (response.data.success) {
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== catId)
          );
          navigate("/restaurent/categoryAddingModal");
          SuccessMessage(response.data.message);
        } else {
          closeModal();
          ErrorMessage(response.data.message);
        }
      } catch (err) {
        closeModal();
        ErrorMessage(err.data.message);
      }
    } else {
      closeModal();
      ErrorMessage("Canceled!!");
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex ml-60">
                <h1 className="ml-40 text-xl font-bold text-gray-800">
                  {"Category"} Management
                </h1>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
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
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length !== 0 ? (
                    currentItems.map((item, ind) => (
                      <tr
                        key={item._id}
                        className="transition-all hover:bg-gray-100"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center font-semibold">
                            {(currentPage - 1) * itemsPerPage + ind + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">{item.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <button
                              className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-blue-500 shadow-md hover:bg-blue-400"
                              onClick={() => {
                                editCategory(item._id, item.name, item.image);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="p-1 w-20 ml-5 border border-transparent text-white rounded bg-red-500 shadow-md hover:bg-red-400"
                              onClick={() => deleteCategory(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td  className="text-center py-4">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button
                className="p-1 ml-5 border border-transparent text-white rounded bg-teal-500 shadow-md hover:bg-teal-400"
                style={{ whiteSpace: "nowrap" }}
                type="button"
                onClick={openModal}
              >
                Add Categories
              </button>
              <CategoryModal
                showModal={showModal}
                closeModal={closeModal}
                categoryId={categoryId}
                categoryToEdit={categoryToEdit}
                editMode={editMode}
              />
            </div>
            <div className="float-center mt-3">
              <PAgination
                filterPagination={filterPagination}
                currentPage={currentPage}
                size={size}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
