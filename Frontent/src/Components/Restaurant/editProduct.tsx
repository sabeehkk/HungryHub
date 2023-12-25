import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { restaurentAxios } from "../../axios/axios";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import { uploadFoodImage } from "../../api/restaurentApi";
import { PRICE_REGEX } from "../../rejux";
import Loading from "../../Components/loading";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState(false);
  const [correntCat, setCorrentCat] = useState();
  const [previewImages, setPreviewImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [load, setLoad] = useState(true);

  const restaurent = useSelector((state: any) => state.restaurentAuth);
  const restId = restaurent.restaurent._id;
  const validPrice = () => {
    if (
      (variants.length === 1 && !variants[0].name && !variants[0].price) ||
      (variants.length > 1 &&
        variants.every((variant) => !variant.name && !variant.price))
    ) {
      return false;
    }
    for (const variant of variants) {
      if (variant.price && !PRICE_REGEX.test(variant.price)) {
        return false;
      }
    }
    return true;
  };
  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };
  const removeVariant = (index: any) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  const handleVariantNameChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].name = e.target.value;
    setVariants(updatedVariants);
  };
  const handleVariantPriceChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].price = e.target.value;
    setVariants(updatedVariants);
  };
  const handleVariantOfferChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].offer = e.target.value;
    updatedVariants[index].offerPrice =
      parseFloat(variants[index].price) -
      (parseFloat(variants[index].price) * parseFloat(e.target.value)) / 100;
    setVariants(updatedVariants);
  };
  useEffect(() => {
    categoryData();
  }, []);
  const handleImages = (e) => {
    if (e.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    const newImages = [...e.target.files];
    setImages(newImages);
    const imagePreviews = [];
    for (const image of newImages) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.push(e.target.result);
        setPreviewImages([...imagePreviews.slice(0, 4)]);
      };
      reader.readAsDataURL(image);
    }
  };

  const categoryData = async () => {
    const response = await restaurentAxios.get(`/getCategory?id=${restId}`);
    const data = response.data;
    if (data) {
      setCategories(data.categoryData);
    }
  };

  useEffect(() => {
    restaurentAxios
      .get(`/editProduct?id=${productId}`)
      .then((response) => {
        setProductName(response.data.product.productName);
        setDescription(response.data.product.description);
        setCategory(response.data.product.category._id);
        setCorrentCat(response.data.product.category.name);
        setImages(response.data.product.images);
        setVariants(response.data.product.variants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleImageUpload = async (images: any) => {
    if (!images || images.length === 0) return [];
    const url: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const data = await uploadFoodImage(img);
      url.push(data);
    }
    return url;
  };

  const editProduct = async () => {
    if (productName.trim() === "") {
      return ErrorMessage("Please Fill ProductName");
    }
    if (category.trim() === "") {
      return ErrorMessage("Please Fill category");
    }
    if (description.trim() === "") {
      return ErrorMessage("Please Fill Description");
    }
    if (!variants || variants.length === 0) {
      return ErrorMessage("Please add at least one variant");
    }
    if (!variants.some((variant) => variant.price !== "string")) {
      return ErrorMessage("At least one variant should have a non-null price");
    }
    if (!validPrice()) {
      return ErrorMessage("enter valid price");
    }
    if (images.length < 4) {
      return ErrorMessage("Please upload at least 4 images");
    }
    setLoad(true);
    const urlImages = await handleImageUpload(images);
    if (productName.trim().length === 0 || description.trim().length === 0) {
      setErrors(true);
    } else {
      console.log("inside else");
      const FormData = {
        productName,
        description,
        category,
        images: urlImages,
        restId,
        productId,
        variants,
      };
      restaurentAxios
        .patch("/updateProduct", FormData)
        .then((response) => {
          if (response.data.success) {
            SuccessMessage(response.data.message);
            navigate("/restaurent/products");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    setLoad(false);
  }, []);
  return load ? (
    <Loading />
  ) : (
    <>
      <div className="text-center ">
        <h2 className="text-4xl font-bold italic text-black">
          {"Edit Your Food Details"}
        </h2>
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
              <option value="">{correntCat}</option>
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
            {variants.map((variant, index) => (
              <div key={index} className="border rounded-sm md:w-3/5 w-full">
                <input
                  type="text"
                  placeholder="Variant Name"
                  value={variant.name}
                  onChange={(e) => handleVariantNameChange(e, index)}
                  className="md:border-r-4 rounded-sm md:w-1/2 bg-gray-300 py-1 w-full"
                />
                <input
                  type="number"
                  placeholder="Variant Price"
                  value={variant.price}
                  onChange={(e) => handleVariantPriceChange(e, index)}
                  className="border rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
                />
                <input
                  type="number"
                  placeholder="Offer (%)"
                  value={variant.offer}
                  onChange={(e) => handleVariantOfferChange(e, index)}
                  className="md:border-r-4 rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
                />
                <input
                  type="number"
                  placeholder="Offer Price"
                  value={variant.offerPrice}
                  readOnly
                  className="border rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
                />
                <button
                  className="bg-red-500 text-white border-neutral-50  hover:text-black"
                  onClick={() => removeVariant(index)}
                >
                  Remove Variant
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white border-neutral-50  hover:text-black"
              onClick={addVariant}
            >
              Add Variant
            </button>
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              id="restId"
              value={restId}
              readOnly
              style={{ display: "none" }}
              className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
            />
            <label htmlFor="image" className="block font-medium">
              Add Best Food Images (4-5 images)
            </label>
            <div className="custom-file mt-3 h-auto items-center justify-center bg-gray-300 md:w-3/5 w-full">
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload up to 4 files</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImages}
                        multiple
                        min={4}
                        max={5}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="w-1/4 p-2">
                    <label
                      htmlFor={`profImage-${index}`}
                      className="block relative"
                    >
                      <img
                        className="h-52 object-cover w-full rounded-md"
                        src={image}
                        alt={`Product Image ${index + 1}`}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap">
                {previewImages.map((preview, index) => (
                  <div key={index} className="w-1/4 p-2">
                    <label
                      htmlFor={`profImage-${index}`}
                      className="block relative"
                    >
                      <img
                        className="h-52 object-cover w-full rounded-md"
                        src={preview}
                        alt={`Preview ${index + 1}`}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-1 ml-16">
              <button
                className="bg-teal-500 text-white border-neutral-50  hover:text-black"
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
    </>
  );
};

export default EditProduct;
