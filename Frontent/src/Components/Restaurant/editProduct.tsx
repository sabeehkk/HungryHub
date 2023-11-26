import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import { uploadFoodImage } from "../../api/restaurentApi";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState(false);
  const fileInputRef = useRef(null);

  const restaurent = useSelector((state) => state.restaurentAuth);
  const restId = restaurent.restaurent._id;
  console.log(restId, "restidd");

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
    restaurentAxios
      .get(`/editProduct?id=${productId}`)
      .then((response) => {
        console.log(response, "responseDatassss");
        setProductName(response.data.product.productName);
        setDescription(response.data.product.description);
        setCategory(response.data.product.category.name);
        setProductPrice(response.data.product.price);
        setImages(response.data.product.images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleImageUpload = async (images: any) => {
    if (!images || images.length === 0) return [];
    // if (images.length < 4) {
    //   return ErrorMessage("Please upload at least 4 images");
    // }
    const url: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const data = await uploadFoodImage(img);
      url.push(data);
    }
    return url;
  };

  const editProduct = async () => {
    console.log('inside editproduct');
    if(productName.trim() === ""){
      return ErrorMessage("Please Fill ProductName");
    }
    if(description.trim() === ""){
      return ErrorMessage("Please Fill Description");
    }
    if(!productPrice){
      return ErrorMessage("Please Fill Product Price");
    }
    if(!categoryData){
      return ErrorMessage("Please Fill Product Price");
    }
   
    // if (images.length < 4) {
    //   return ErrorMessage("Please upload at least 4 images");
    // }
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
        productId,
      };
      restaurentAxios
        .patch("/updateProduct", FormData)
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
          {!productName.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Product Name is required"}</p>
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
              // min={1}
              // max={5}
            />
          </div>
          <div className="pt-10">
            <button
              className="ml-14 bg-teal-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={editProduct}
            >
              Edit Product
            </button>
          </div>
          <div className="pt-3 "></div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
