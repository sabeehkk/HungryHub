import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { restaurentAxios } from "../../axios/axios";
import Pagination from "../../assets/pagination";
import CategoryModal from "../../Components/Restaurant/categoryModal";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import PAgination from "../../Components/pagination";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = categories.slice(startIndex, endIndex);
  const [size, setSize] = useState(1);

  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const activeEditMode = () => {
    setEditMode(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const editCategory = (catId, catName) => {
    setCategoryId(catId);
    setCategoryToEdit(catName);
    activeEditMode();
    openModal();
  };

  const restaurant = useSelector((state) => state.restaurentAuth);
  let result = restaurant.restaurent;
  const restId = result?._id;

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
  }, [is_deleted, showModal]);

  const deleteCategory = async (catId) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      restaurentAxios
        .patch("/deleteCategory", { catId })
        .then((response) => {
          if (response.data.success) {
            navigate("/restaurent/categoryAddingModal");

            return SuccessMessage(response.data.message);
            console.log(response.data);
            setDeleted(!is_deleted);
          } else {
      closeModal()

            return ErrorMessage(response.data.message);
          }
        })
        .catch((err) => {
          // alert(err.message);
      closeModal()
          
          return ErrorMessage(err.data.message);
          // alert('hai')
        });
    } else {
      closeModal()
      return ErrorMessage("");
      // alert('hai')

    }
  };
  const filterPagination = (value) => {
    setPage(value);
  };

  return (
    <>
      <div className="text-center ">
        <h2 className="text-4xl font-bold italic text-black">
          {"Category List"}
        </h2>
      </div>
      <div className="p-10 w-full bg-gray-200">
        <div className="border rounded-md overflow-hidden shadow-md">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-table-blue text-off-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    CATEGORY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length !== 0 ? (
                  currentItems.map((item, ind) => (
                    <tr
                      key={item._id}
                      className="transition-all hover:bg-gray-100"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center font-semibold">
                          {(currentPage - 1) * itemsPerPage + ind + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">{item.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <button
                            className="text-yellow hover:text-orange-500"
                            onClick={() => {
                              editCategory(item._id, item.name, item.image);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deleteCategory(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-table-blue">
            {/* <button
          onClick={openModal}
          className="btn-primary w-full p-2 rounded-md text-center text-off-white"
        >
          Add Categories
        </button> */}
            <button
              className="ml-64 bg-teal-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={openModal}
            >
              Add Categories
            </button>
            <CategoryModal
              showModal={showModal}
              closeModal={closeModal}
              categoryId={categoryId}
              categoryToEdit={categoryToEdit}
              editMode={editMode}
            />
          </div>
          <div className="float-center  mt-3">
            {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
            <PAgination
              currentPage={currentPage}
              filterPagination={filterPagination}
              size={size}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
