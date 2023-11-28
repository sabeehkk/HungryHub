import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
// import Button from "../../assets/button";
import { useNavigate } from "react-router-dom";
import { uploadFoodImage } from "../../api/restaurentApi";

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState(false);
  const [categories, setCategories] = useState([]);
   const [previewImages, setPreviewImages] = useState([]);

  const navigate = useNavigate();

  const restaurant = useSelector((state) => state.restaurentAuth);

  let result = restaurant.restaurent;
  console.log(result, "restuultt");
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const restId = result?._id;
  console.log(restId, "restiddd");
  const categoryData = async () => {
    console.log("inside categoryData");

    const response = await restaurentAxios.get(`/getCategory?id=${restId}`);
    const data = response.data;
    console.log(data, "categorydatas");
    if (data) {
      setCategories(data.categoryData);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setImages(filesArray);
    }
  };
  const handleImageUpload = async (images: any) => {
    if (!images || images.length === 0) return [];
    if (images.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    const url: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const data = await uploadFoodImage(img);
      url.push(data);
    }
    return url;
  };
  const handleImages = (e) => {
    if (e.target.files.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }

    const newImages = [...images, ...Array.from(e.target.files)];
    setImages(newImages);

    // Image preview
    const imagePreviews = [];
    for (const image of newImages) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.push(e.target.result);
        // Assuming setPreviewImages is a state setter for image previews
        setPreviewImages([...imagePreviews.slice(0,4)]);
      };
      reader.readAsDataURL(image);
    }
   
  };
  

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage, "selected imagee");
      setSelectedImage(null);
    }
  }, [selectedImage]);

  const addProduct = async () => {
    if (productName.trim() === "") {
      return ErrorMessage("Please Fill ProductName");
    }
    if (category.trim() === "") {
      return ErrorMessage("Please Fill category");
    }
    if (description.trim() === "") {
      return ErrorMessage("Please Fill Description");
    }
    if (productPrice.trim() === "") {
      return ErrorMessage("Please Fill product price");
    }
   

    if (images.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    const urlImages = await handleImageUpload(images);
    console.log("image url ", urlImages);

    if (productName.trim().length === 0 || description.trim().length === 0) {
      setErrors(true);
    } else {
      console.log("inside else");
      const FormData = {
        productName,
        description,
        productPrice,
        category,
        images: urlImages,
        restId,
      };
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
    <>
      <div className="text-center ">
      <h2 className="text-4xl font-bold italic text-black">

          {"Add Your Food Details"}</h2>
      </div>
      <div className="p-10">
        <div className="md:flex p-4">
          <div className="md:w-1/2 leading-6">
            <label className="block font-medium">Product Name:</label>
            {!productName.trim().length && errors && (
              <p className="text-red-500 text-sm">
                {"Product Name is required"}
              </p>
            )}
            <input
              type="text"
              id="name"
              name="name"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
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
              <p className="text-red-500 text-sm">
                {"Description is required"}
              </p>
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

<div className="custom-file mt-3 h-auto items-center justify-center bg-gray-300 md:w-3/5 w-full">
  <div className="flex flex-wrap">
    {previewImages.map((preview, index) => (
      <div key={index} className="w-1/4 p-2">
        <label htmlFor={`profImage-${index}`} className="block relative">
          <img
            className="h-52 object-cover w-full rounded-md"
            src={preview}
            alt={`Preview ${index + 1}`}
          />
        </label>
      </div>
    ))}
  </div>
  {previewImages.length > 0 && (
    <label htmlFor="profImage" className="w-1/4 p-2 block relative">
      {/* <img
        className="h-52 object-cover w-full rounded-md"
        // src={previewImages[0]}
        // alt={`Preview 1`}
      /> */}
    </label>
  )}
  <input
    className="form-control custom-file-input"
    name="file"
    multiple
    type="file"
    id="fileInput"
    required
    onChange={handleImages}
    min={1}
    max={4}
  />
</div>
            <div className="pt-10">
              <button
                className="ml-14 bg-teal-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    </>
  );
};

export default AddProduct;
