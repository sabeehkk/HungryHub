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
      <div className="modal-container border rounded-md bg-off-White">
        <div className="modal-content">
          <div className="rounded-t-md modal-header bg-cherry-Red p-3 flex justify-between text-off-White items-center">
            <h2 className="text-xl font-bold">
              {editMode ? "Edit Category" : "Add Category"}
            </h2>
            <button className="text-2xl" onClick={toCloseModal}>
              &times;
            </button>
          </div>
          <div className="modal-body p-3">
            <label htmlFor="categoryName" className="block mb-2">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-full p-2 border border-gray-300"
            />
          
            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-off-White mt-2 p-1 rounded-sm"
            >
              {editMode ? "Edit Category" : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
