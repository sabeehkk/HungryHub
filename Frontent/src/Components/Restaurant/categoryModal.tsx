/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import { CategoryModalProps } from "../../models/models";

const CategoryModal: React.FC<CategoryModalProps> = ({
  showModal,
  closeModal,
  categoryId,
  categoryToEdit,
  editMode,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const restaurent = useSelector((state:any) => state.restaurentAuth);
  const restId = restaurent.restaurent?._id;
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };
  const toCloseModal = () => {
    setCategoryName("");
    closeModal();
  };
  useEffect(() => {
    setCategoryName(categoryToEdit);
  }, [editMode]);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() !== "") {
      if (editMode && categoryId) {
        const result = await restaurentAxios.patch("/editCategory", {
          categoryName,
          categoryId,
          restId,
        });
        if (result) {
          closeModal();
          return SuccessMessage("Category edited");
        }
        setCategoryName("");
      } else {
        restaurentAxios
          .post("/addCategory", { categoryName, restId })
          .then((response) => {
            closeModal();
            setCategoryName("");
            return SuccessMessage("category created");
          })
          .catch((error) => {
            console.error("Error adding category:", error);
            closeModal();
            return ErrorMessage("Category Already exist");
          });
      }
    } else {
      return ErrorMessage("Please enter category name");
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal ? "visible" : "invisible"
      }`}
    >
      <div
        id="defaultModal"
        
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-gray-300 bg-opacity-50"
      >
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editMode ? "Edit Category" : "Add Category"}
            </h3>

            <button
              onClick={toCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white border-none"
            >
              <svg
                className="w-3 h-3 border-none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="text-white border-none">X</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="newValue"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Category
                </label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  placeholder={"Add New category"}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
