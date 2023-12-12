import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { toast } from "react-toastify";
import ProductDetailModal from "../User/productDetailModal";
import { restaurentAxios } from "../../axios/axios";
import { userAxios } from "../../axios/axios";
import Pagination from "../../assets/pagination";
import PAgination from "../../Components/pagination";

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restData, setRestData] = useState();
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [item, setsetItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(filterdProducts,'filterdProducts');
  
  const [size, setSize] = useState(1);

  const price = [
    { fieled: "₹ : 0 - 50", startedAt: 0 },
    { fieled: "₹ : 50 - 100", startedAt: 50 },
    { fieled: "₹ : 100 - 500", startedAt: 100 },
    { fieled: "₹ : 500 - 1000", startedAt: 500 },
    { fieled: "₹ : 1000+", startedAt: 1000 },
  ];

  console.log(product, "products in menu pages");
  console.log(categories, "category in menu pages");

  const itemsPerPage = 5;
  const totalPages = Math.ceil(product?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const { restId } = useParams();

  const handleProducData = async (proId) => {
    try {
      const { data } = await userAxios.get(`/getProuductDetail?id=${proId}`);
      console.log(data, "restaurent details in menupage");

      if (data) {
        setsetItem(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const response = async () => {
      try {
        const { data } = await restaurentAxios.get(
          `/getResProfile?id=${restId}`
        );
        console.log(data, "restoProfile datas");

        if (data) {
          setRestData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);

  useEffect(() => {
    restaurentAxios
      .get(`/getRestaurentProduct?id=${restId}`)
      .then((response) => {
        setProduct(response.data.productData);
        console.log(response.data.productData, "restoProducts");

        // const newSize = response.data.size;
        // setSize(newSize);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
  }, []);

  const categoryData = async () => {
    const { data } = await restaurentAxios.get(`/getCategory?id=${restId}`);
    console.log(data.categoryData, "found category data");

    if (data) {
      setCategories(data.categoryData);
    } else {
      ("");
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  useEffect(() => {
    const fetchProducts = () => {
      const searchTermLowercase = searchTerm.toLowerCase();
      const filteredProducts = product.filter((product) =>
        product.productName.toLowerCase().includes(searchTermLowercase)
      );
      setFilterdProducts(filteredProducts);
    };
    fetchProducts();
  }, [searchTerm]);

  const handleCategorySelection = (ind) => {
    const selectedCat = categories[ind];
    setSelectedCategory(selectedCat);

    if (selectedCat) {
      const catId = selectedCat._id;
      const catProd = product.filter((product) => product.category === catId);
      toggleDropdown();
      setFilterdProducts(catProd);
    } else {
      setFilterdProducts([]);
    }
  };

  const handlePriceSelection = (indx) => {
    const priceSelected = price[indx];
    setSelectedPrice(priceSelected);
    let nearestPrice;
    if (indx < price.length - 1) {
      nearestPrice = price[indx + 1].startedAt;
    } else {
      nearestPrice = 5000;
    }

    if (priceSelected) {
      const pricedProd = product?.map((variant) => {
        
        const filteredVariants = variant.variants.filter((priceBetween) => {

          return (
            priceBetween.price >= priceSelected.startedAt &&
            priceBetween.price < nearestPrice
          );
        });
        return { ...variant, variants: filteredVariants };
      });
      console.log(pricedProd,'selected product');

      togglePriceDropdown();
      setFilterdProducts(pricedProd);
    } else {
      setFilterdProducts([]);
    }
  };

  return (
    <div className="bg-gray-100 container mx-auto px-5 my-element ">
      <ProductDetailModal isOpen={isModalOpen} close={closeModal} item={item} />
      <div className="sm:px-24 px-3 md:px-32 lg:px-44 pt-3">
        <div className="grid grid-cols-1 p-2 py-3 shadow-md rounded-md">
          <div className="mb-10">
            <div className="flex justify-between items-baseline">
              <h3 className="ml-8 text-3xl font-bold italic text-black">
                {restData?.restData.restaurantName}
              </h3>
              <div className="border rounded-sm px-3  shadow-md bg-white">
                <div className="flex ">
                  <h4 className="text-xl font-bold ml-auto mr-1">
                    {/* {restData?.ratings[0]?.averageRating} */}
                  </h4>
                  <h4 className="flex text-xl mt-1 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <hr />
                <div className="font-lobster text-gray-500">N/A</div>
              </div>
            </div>
            {/* <div className=""> */}
              <h4 className="ml-8 text-lg text-gray-500 ">
                Info : {restData?.restData.phoneNumber}
              </h4>
              <h4 className="ml-8 text-lg text-gray-500">
                {restData?.restData.place}
              </h4>
           
            {/* </div> */}
          </div>
          <div className="border border-gray-300 h-2 bg-gray-300"></div>
        </div>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <div className=" text-center mt-4 flex items-center justify-between mb-2">
          <div className=" navbar shadow-lg">
            <div className=" navbar-start">
              <div className="dropdown ">
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden "
                  onClick={(e) =>
                    e.currentTarget.nextElementSibling.classList.toggle(
                      "hidden"
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div className=" navbar-center hidden lg:flex flex items-center w-[1124px]">
              <div className=" flex flex-col  p-7 py-4 m-h-screen">
                <div className=" bg-white items-center justify-between w-72 h-10 flex rounded-full shadow-lg p- mb-3 sticky">
                  <div>
                    <div className=" mr-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    className=" font-bold  rounded-full w-full py-1 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                    type="text"
                    placeholder="Search an Item"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                    <svg
                      className="w-2 h-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            

              <ul className=" ml-70 menu menu-horizontal px-1 flex items-center">
                <li className=" font-semibold my-2 cursor-pointer mr-">
                  {/* Category Dropdown */}
                  <section aria-labelledby="information-heading">
                    <div className=" relative">
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className="border-none bg-white flex items-center text-sm font-medium focus:outline-none"
                      >
                        {selectedCategory ? selectedCategory.name : "Category"}
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform  ${
                            isDropdownOpen ? "" : "transform rotate-180"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                          style={{ zIndex: 10 }}
                        >
                          {categories.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer text-left"
                              onClick={() => handleCategorySelection(index)}
                            >
                              {option.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                </li>

                <li className="font-semibold my-2 cursor-pointer">
                  {/* Price Dropdown */}
                  <section aria-labelledby="information-heading">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={togglePriceDropdown}
                        className="border-none bg-white flex items-center text-sm font-medium focus:outline-none ml-3 "
                      >
                        {selectedPrice ? selectedPrice.fieled : "Select Price"}
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform ${
                            isPriceDropdownOpen ? "" : "transform rotate-180"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {isPriceDropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                          style={{ zIndex: 10 }}
                        >
                          {price.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer text-left"
                              onClick={() => handlePriceSelection(index)}
                            >
                              {option.fieled}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        {filterdProducts?.length !== 0 ? (
          
          filterdProducts?.map((prod) => (
            <div className="p-2" key={prod._id}>
              <div className="mb-10 sm:flex sm:justify-between block">
                <div className="">
                  <h4 className="text-xl font-bold mt-2">{prod.productName}</h4>
                  <h4 className="text-lg text-gray-500">{prod.description}</h4>
                  <h4 className="text-lg text-gray-500">
                    Best Price :₹ {prod.variants[0]?.offerPrice}
                    {/* Price :₹ {prod.variant} */}
                  </h4>
                </div>
                <div
                  className="sm:w-36 sm:h-28 rounded-md bg-cover bg-center bg-no-repeat h-72 flex flex-col justify-between"
                  // style={{ backgroundImage: `url(${prod?.images})` }}
                  // style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D')` }}
                  style={{ backgroundImage: `url(${prod?.images[0]})` }}
                >
                  <div className="flex flex-col justify-end h-full"></div>
                  <button
                    onClick={() => handleProducData(prod._id)}
                    className="text-white py-1.5 px-1 rounded-sm  "
                    style={{ backgroundColor: "#CC252C", border: "none" }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="border border-gray-500"></div>
            </div>
          ))
        ) : (
          <div className="pb-8 mb-5">
            {filterdProducts !== null && filterdProducts?.length === 0 ? (
      <p>No matching products found.</p>
    ) : (
            currentItems?.map((prod) => (
              <div className="pb-2" key={prod._id}>
                <div className="mb-10 sm:flex sm:justify-between block">
                  <div className="">
                    <h4 className="text-xl font-bold mt-2">
                      {prod.productName}
                    </h4>
                    <h4 className="text-lg text-gray-500">
                      {prod.description}
                    </h4>
                    <h4 className="text-lg text-gray-500">
                      {/* Best Price :₹ {prod.variants[0]?.offerPrice} */}
                    </h4>
                  </div>
                  <div
                    className="sm:w-36 sm:h-28 rounded-md bg-cover bg-center bg-no-repeat h-72 flex flex-col justify-between"
                    style={{ backgroundImage: `url(${prod?.images[0]})` }}
                  >
                    <div className="flex flex-col justify-end h-full"></div>
                    <button
                      onClick={() => handleProducData(prod._id)}
                      className="text-white py-1.5 px-1 rounded-sm  "
                      style={{ backgroundColor: "#CC252C", border: "none" }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="border border-gray-500"></div>
              </div>
            ))
          )}
          </div>
        )}
      </div>
      <div className="float-center  ">
        <PAgination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Menu;
