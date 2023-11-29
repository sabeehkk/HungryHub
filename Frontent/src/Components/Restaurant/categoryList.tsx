import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { restaurentAxios } from "../../axios/axios";
// import Pagination from "../../assets/pagination";
import CategoryModal from "../../Components/Restaurant/categoryModal";
import { ErrorMessage, SuccessMessage } from "../../utils/util";
import PAgination from "../../Components/pagination";
import { SwalAlert } from "../../utils/util";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const currentItems = categories.slice();
  const [totalCategories, setTotalCategories] = useState(0);

  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);

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
  const filterPagination = (value) => {
    setPage(value);
  };
  useEffect(() => {
    categoryData();
  }, [is_deleted, showModal, page]);

  const restaurant = useSelector((state) => state.restaurentAuth);
  let result = restaurant.restaurent;
  const restId = result?._id;

  const categoryData = async () => {
    console.log("inside categoryData");
    const response = await restaurentAxios.get(`/getCategory?id=${restId}`, {
      params: { page },
    });
    const data = response.data;
    console.log(data, "categorydatas");
    if (data) {
      setCategories(data.categoryData);
      setTotalCategories(data.size);

      // setSize(data.size)
      const newSize = data.size < 1 ? 1 : data.size;

      setSize(newSize);
    }
  };

  const deleteCategory = async (catId) => {
    const result = await SwalAlert();
    if (result.isConfirmed) {
      try {
        const response = await restaurentAxios.patch("/deleteCategory", {
          catId,
        });
        if (response.data.success) {
          // Update the categories state by filtering out the deleted category
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== catId)
          );

          navigate("/restaurent/categoryAddingModal");
          SuccessMessage(response.data.message);
        } else {
          closeModal();
          ErrorMessage(response.data.message);
        }
      } catch (err) {
        closeModal();
        ErrorMessage(err.data.message);
      }
    } else {
      closeModal();
      ErrorMessage("Canceled!!");
    }
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
            <PAgination
              filterPagination={filterPagination}
              currentPage={currentPage}
              size={size}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
