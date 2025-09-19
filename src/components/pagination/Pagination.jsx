import React from 'react';

const Pagination = ({
  gotoPage,
  nextPage,
  pageIndex,
  pageOptions,
  pageSize,
  previousPage,
  setPageSize,
  currentPage,
}) => {
  const renderPageNums = () => {
    const pageArray = [];
    let lastPage = pageOptions[pageOptions.length - 1];

    if (lastPage > 5) {
      pageArray.push(
        0,
        1,
        '...',
        pageIndex <= 2 ? 2 : pageIndex - 1,
        pageIndex <= 3 ? 3 : pageIndex,
        pageIndex <= 3
          ? 4
          : pageIndex === pageOptions.length - 1
          ? null
          : pageIndex + 1,
        pageIndex === pageOptions.length - 1 ? null : '...',
        pageIndex === lastPage ? null : lastPage
      );
    } else {
      for (let i = 0; i < lastPage; i++) {
        pageArray.push(i);
      }
    }
    return pageArray.map((num, index) => {
      if (num === pageIndex) {
        return (
          <li key={index}>
            <span
              style={{
                background: pageIndex === num ? '#5656ff' : '',
                color: pageIndex === num ? 'white' : '',
              }}
              onClick={() => gotoPage(num)}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer hover:bg-opacity-70 bg-primary-primary`}
            >
              {num + 1}
            </span>
          </li>
        );
      } else if (num === '...') {
        return (
          <li key={index}>
            <span
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer bg-disabled`}
            >
              {num}
            </span>
          </li>
        );
      } else if (num === null) {
        return null;
      } else {
        return (
          <li key={index}>
            <span
              onClick={() => gotoPage(num)}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer hover:bg-opacity-70 ${
                pageIndex === num ? 'bg-primary-primary' : 'bg-disabled'
              }`}
            >
              {num + 1}
            </span>
          </li>
        );
      }
    });
  };

  return (
    <>
      <div className="flex justify-between pt-4">
        <nav aria-label="Page navigation example" className="">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <span
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700  cursor-pointer"
                onClick={() => previousPage()}
              >
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-[22px]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
            {renderPageNums()}
            <li>
              <span
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                onClick={() => nextPage()}
              >
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-[22px]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </nav>
        <select
          className="px-3 rounded-lg outline-none border border-disabled"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} className="p-2" value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Pagination;
