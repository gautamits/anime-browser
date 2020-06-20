import React from 'react';

interface pagination {
  pageSize?: number;
  setPageSize?: (id: number) => void;
  currentPage: number;
  setCurrentPage: (id: number) => void;
  goLeft?: () => void;
  goRight?: () => void;
  pages: number[];
}
export const Pagination: React.FC<pagination> = ({
  pageSize = 10,
  setPageSize = null,
  currentPage = 1,
  setCurrentPage,
  goLeft = null,
  goRight = null,
  pages = [],
}) => {
  return (
    <div className="flex pagination-container">
      <ul className="pages">
        {pages.map((p) => (
          <li
            key={p}
            onClick={(e) => setCurrentPage(p)}
            className={`page-number ${currentPage === p ? "active" : ""}`}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
};
