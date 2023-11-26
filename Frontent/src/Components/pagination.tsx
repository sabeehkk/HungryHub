import React from "react";

const Pagination = ({ size, filterPagination, currentPage }) => {
  const limit = 3;
  return (
    <>
      <div className="flex justify-center items-center py-4">
        <ul className="pagination flex space-x-2">
          <li>
            <button
              onClick={() => {
                if (currentPage !== 1) {
                  filterPagination(currentPage - 1);
                }
              }}
              className="hover:bg-gray-200 cursor-pointer p-2 rounded-full"
              disabled={currentPage === 1}
            >
              &laquo; Prev
            </button>
          </li>
          {[...Array(size)].map((_, i) => {
            let pageNumber = i + 1;

            return (
              <li key={i}>
                <button
                  className={`${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-blue-200"
                  } hover:bg-blue-400 cursor-pointer p-2 rounded-full`}
                  onClick={() => filterPagination(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => {
                if (currentPage !== size) {
                  filterPagination(currentPage + 1);
                }
              }}
              className="hover:bg-gray-200 cursor-pointer p-2 rounded-full"
              disabled={currentPage === size}
            >
              Next &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
