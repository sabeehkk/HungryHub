import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { restaurentAxios } from "../../axios/axios";


const CategoryModal = ({showModal})=>{
  const [categoryName,setCategoryName]= useState("");

  const restaurent = useSelector((state)=>state.restaurentAuth)
  console.log(restaurent,'restaurent details in category page');
  
const restId = restaurent.restaurent._id ;
console.log(restId);

  const handleAddCategory = ()=>{   
      restaurentAxios.post("/addCategory",{categoryName,restId})
      .then((response)=>{       
      })
  }

  return (
    <div className="modal-body p-3">
            <label htmlFor="categoryName" className="block mb-2">
              Category Name:
            </label>
             <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e)=>{
                setCategoryName(e.target.value)
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
  )  
}

export default CategoryModal



