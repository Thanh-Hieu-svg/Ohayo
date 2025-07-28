import React from "react";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <ul className="flex gap-2 justify-center mt-6">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-200 border-gray-300"
          }`}
        >
          ←
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => (
        <li key={i + 1}>
          <button
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all duration-200 ${
              currentPage === i + 1
                ? "bg-green-500 text-white border-green-500 hover:bg-green-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-200 border-gray-300"
          }`}
        >
          →
        </button>
      </li>
    </ul>
  );
};
