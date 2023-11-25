import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage, SuccessMessage } from "../../utils/util";

const EditProduct = () => {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [images, setImages] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState(false);

  const restaurent = useSelector((state) => state.restaurentAuth);
  const restId = restaurent.restaurent._id;
  console.log(restId,'restidd');
  

  useEffect(() => {
    categoryData();
  }, []);

  const handleImages = (e) => {
    if (e.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    setImages([...images, ...e.target.files]); // Use ... to spread the files into the array
  };

  const categoryData = async () => {
    console.log("inside categoryData");

    const response = await restaurentAxios.get(`/getCategory?id=${restId}`);
    const data = response.data;
    console.log(data, "edit product Category datasssssss");
    if (data) {
      setCategories(data.categoryData);
    }
  };

  useEffect(() => {
    restaurentAxios.get(`/editProduct?id=${productId}`).then((response) => {
      console.log(response, "responseDatassss");
      setName(response.data.product.productName);
    });
  });

  const addProduct = async () => {
    
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      productPrice.trim() === "" ||
      !category
    ) {
      return ErrorMessage("Please Fill All Field");
    }
    if (images.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    const urlImages = await handleImageUpload(images);
    console.log("image url ", urlImages);
   
    if (name.trim().length === 0 || description.trim().length === 0) {
      setErrors(true);
    } else {
      console.log("inside else");
      const FormData = {
        name,
        description,
        productPrice,
        category,
        images: urlImages,
        restId,
      } ;
      restaurentAxios
        .post("/addProduct", FormData)
        .then((response) => {
          if (response.data.message == "success") {
            SuccessMessage("product added successfully");
            navigate("/restaurent/home");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="p-10">
      <div className="md:flex p-4">
        <div className="md:w-1/2 leading-6">
          <label className="block font-medium">Product Name:</label>
          {!name.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Product Name is required"}</p>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          {!description.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Description is required"}</p>
          )}
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 h-32 w-full"
          />
          {!category.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Select a Category"}</p>
          )}

          <label htmlFor="price" className="block font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
        </div>
        <div className="md:w-1/2">
          <label htmlFor="restId" className="block font-medium">
            Restaurant ID
          </label>
          <input
            type="text"
            id="restId"
            value={restId}
            readOnly
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />

          <div className="custom-file mt-3 h-52 items-center justify-center bg-gray-300 md:w-3/5 w-full">
            <label htmlFor="profImage" className=""></label>
            <input
              className="form-control custom-file-input"
              name="file"
              multiple
              type="file"
              id="fileInput"
              required
              onChange={handleImages}
              min={4}
              max={5}
            />
          </div>
          <div className="pt-10">
            <button
              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
          <div className="pt-3 "></div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;