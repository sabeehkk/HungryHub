/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { restaurentAxios } from "../../axios/axios";

const CategoryModal = ({ showModal}) => {
  const [categoryName, setCategoryName] = useState("");
  const restaurent = useSelector((state:any) => state.restaurentAuth);
  const restId = restaurent.restaurent._id;
  const handleAddCategory = () => {
    restaurentAxios
      .post("/addCategory", { categoryName, restId })
      .then((response) => {});
  };
  return (
    <div className="modal-body p-3">
      <label htmlFor="categoryName" className="block mb-2">
        Category Name:
      </label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
        className="w-full p-2 border border-gray-300"
      />
      <button
        onClick={handleAddCategory}
        className="bg-green-600 text-off-White mt-2 p-1 rounded-sm"
      >
        Add Category
      </button>
    </div>
  );
};

export default CategoryModal;
