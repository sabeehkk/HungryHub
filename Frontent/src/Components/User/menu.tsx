import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { toast } from "react-toastify";
import ProductDetailModal from "../User/productDetailModal";
import { restaurentAxios } from "../../axios/axios";
import { userAxios } from "../../axios/axios";
import Pagination from "../../assets/pagination";

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
      togglePriceDropdown();
      setFilterdProducts(pricedProd);
    } else {
      setFilterdProducts([]);
    }
  };

  return (
    <div className="container mx-auto px-5 my-element pt-5">
      <ProductDetailModal isOpen={isModalOpen} close={closeModal} item={item} />
      <div className="sm:px-24 px-3 md:px-32 lg:px-44 pt-3">
        <div className="grid grid-cols-1 p-2 py-3 shadow-md rounded-md">
          <div className="mb-10">
            <div className="flex justify-between items-baseline">
              <h2 className="ml-8 text-4xl font-bold italic text-black">
                {restData?.restData.restaurantName}
              </h2>
              <div className="border rounded-sm px-3 py-1 shadow-md bg-white">
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
            <div className="">
              <h4 className="ml-8 text-lg text-gray-500 ">
                Info : {restData?.restData.phoneNumber}
              </h4>
              <h4 className="text-lg text-gray-500">
                {restData?.restData.Place}
              </h4>
              <h4 className="text-lg text-gray-500">
                {restData?.Address?.state}
              </h4>
            </div>
          </div>
          <div className="border border-gray-300 h-2 bg-gray-300"></div>
        </div>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <div className="text-center mt-8 flex items-center justify-between mb-4">
          <div className="navbar shadow-lg">
            <div className="navbar-start">
              <div className="dropdown ">
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden"
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
                {/* <ul
                  tabIndex={0}
                  className="menu-md dropdown-content mt-3 z-[1] p-2 shadow w-52  bg-gray-700 text-off-White"
                >
                  <li className="font-semibold my-2 cursor-pointer "> */}
                    {/* <button
                      type="button"
                      onClick={toggleDropdown}
                      className="flex items-center text-sm font-medium text-off-White hover:text-off-White focus:outline-none"
                    >
                      {selectedCategory ? selectedCategory.name : "Category"}
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
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
                    </button> */}
                  {/* </li> */}
                  {/* {isDropdownOpen &&
                    categories?.map((cate, indx) => (
                      <li key={indx}>{cate.name}</li>
                    ))} */}
                {/* </ul> */}
              </div>
           
            </div>
            {/* <div className="navbar-center hidden lg:flex">
              <input
                type="text"
                placeholder="Search an item..."
                className=" px-12 py-2  border rounded-sm focus:outline-none focus:right-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="ml-40 menu menu-horizontal px-1">
                <li className=" font-semibold my-2 cursor-pointer">
                  <section aria-labelledby="information-heading" className="">
                    <div className="relative ">
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center text-sm font-medium focus:outline-none"
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
                  <section aria-labelledby="information-heading" className="">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={togglePriceDropdown}
                        className="flex items-center text-sm font-medium focus:outline-none"
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
            </div> */}
<div className="navbar-center hidden lg:flex flex items-center">
  <input
    type="text"
    placeholder="Search an item..."
    className="px-12 py-2 border rounded-sm focus:outline-none focus:right-1"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <ul className="ml-40 menu menu-horizontal px-1 flex items-center">
    <li className="font-semibold my-2 cursor-pointer">
      {/* Category Dropdown */}
      <section aria-labelledby="information-heading">
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center text-sm font-medium focus:outline-none"
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
            className="flex items-center text-sm font-medium focus:outline-none"
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
            {currentItems?.map((prod) => (
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
            ))}
            <div className="float-right mr-3 mt-3 pb-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
