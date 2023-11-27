import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage } from "../../utils/util";


const CategoryModal = ({ showModal, closeModal, categoryId, categoryToEdit, editMode }) => {
  const [categoryName, setCategoryName] = useState("")

  const restaurent = useSelector((state)=>state.restaurentAuth)
  const restId = restaurent.restaurent?._id ;

  const handleCategoryNameChange = (e) => {
      setCategoryName(e.target.value);
  };


  const toCloseModal = ()=>{
    setCategoryName("")
    closeModal()
  }

  useEffect(()=>{
    setCategoryName(categoryToEdit)
  },[editMode])

  const handleAddCategory = () => {
    if (categoryName.trim() !== "") {
      if (editMode && categoryId) {
        restaurentAxios.patch('/editCategory',{ categoryName, categoryId, restId })
       .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        closeModal();
        setCategoryName("");
      })
      .catch((err) => {
        console.log(err);
       return ErrorMessage(err.message)
    
      });
      } else {
        restaurentAxios.post("/addCategory", { categoryName, restId })
          .then((response) => {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            closeModal();
            setCategoryName("");
          })
          .catch((err) => {
            console.log(err);
            return ErrorMessage(err.message)
           
          });
      }
    } else {
      toast.error("Please enter category name", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
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
        tabIndex="-1"
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
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
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
              <span className="sr-only">Close modal</span>
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
                  placeholder={"Add New " }
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
  
    // <div
    //   className={`fixed inset-0 flex items-center justify-center z-50 ${
    //     showModal ? "visible" : "invisible"
    //   }`}
    // >
    //   <div className="modal-container border rounded-md bg-off-White">
    //     <div className="modal-content">
    //       <div className="rounded-t-md modal-header bg-cherry-Red p-3 flex justify-between text-off-White items-center">
    //         <h2 className="text-xl font-bold">
    //           {editMode ? "Edit Category" : "Add Category"}
    //         </h2>
    //         <button className="text-2xl" onClick={toCloseModal}>
    //           &times;
    //         </button>
    //       </div>
    //       <div className="modal-body p-3">
    //         <label htmlFor="categoryName" className="block mb-2">
    //           Category Name:
    //         </label>
    //         <input
    //           type="text"
    //           id="categoryName"
    //           value={categoryName}
    //           onChange={handleCategoryNameChange}
    //           className="w-full p-2 border border-gray-300"
    //         />
          
    //         <button
    //           onClick={handleAddCategory}
    //           className="bg-green-600 text-off-White mt-2 p-1 rounded-sm"
    //         >
    //           {editMode ? "Edit Category" : "Add Category"}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default CategoryModal;
