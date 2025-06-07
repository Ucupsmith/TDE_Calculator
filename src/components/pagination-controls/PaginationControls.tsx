import { Button } from '@material-tailwind/react';
import React from 'react';

const PaginationControls = ({
  currentPage,
  itemsPerPage,
  onPageChanges,
  totalItems
}: {
  currentPage: number;
  itemsPerPage: number;
  onPageChanges: (page: number) => void;
  totalItems: number;
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');

      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className='flex flex-row w-80 items-center justify-center gap-3 px-2 h-14 bg-white rounded-[25px] mb-20'>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChanges(currentPage - 1)}
        className='w-10 flex items-center justify-center text-green-500 border border-none bg-white  shadow-none'
      >
        prev
      </Button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChanges(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
            ${
              page === currentPage && typeof page === 'number'
                ? 'w-32 bg-green-500 text-white font-bold border-white'
                : 'bg-transparent text-green-500 hover:bg-green-700 scale-75'
            }
            ${typeof page === 'string' ? 'cursor-default opacity-50 hover:bg-transparent' : ''}
          `}
        >
          {page}
        </button>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChanges(currentPage + 1)}
        className='w-10 flex items-center justify-center text-green-500 border border-none bg-white  shadow-none'
      >
        next
      </Button>
    </div>
  );
};

export default PaginationControls;
