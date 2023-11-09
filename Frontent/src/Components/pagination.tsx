import React from "react";

const Pagination = ({ size, filterPagination, currentPage }) => {
  const limit = 3;
  return (
    <>
      <div className="flex justify-center items-center py-4">
        <div className="pagination space-x-2 flex">
          <button
            onClick={() => {
              currentPage !== 1 ? filterPagination(currentPage - 1) : "";
            }}
            className="hover:text-blue-500"
          >
            &laquo;
          </button>
          {[...Array(size)].map((e, i) => {
            let pageNumber = 1;

            if (limit < size && currentPage == limit) {
              pageNumber = i + 2;
            } else if (currentPage >= limit && size !== currentPage) {
              pageNumber = i + currentPage - 1;
            } else if (currentPage == size && size > limit) {
              pageNumber = i + currentPage - 2;
            } else {
              pageNumber = i + 1;
            }
            return i < limit ? (
              <button
                className={`${
                  currentPage === pageNumber ? "bg-yellow-600" : "bg-yellow-300"
                } cursor-pointer m-2 px-3 py-1 hover:bg-yellow-500 rounded-full`}
                onClick={() => filterPagination(pageNumber)}
                key={i}
              >
                {pageNumber}
              </button>
            ) : (
              ""
            );
          })}

          <button
            onClick={() => {
              currentPage !== size ? filterPagination(currentPage + 1) : "";
            }}
            className="hover:text-blue-500"
          >
            &raquo;
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
