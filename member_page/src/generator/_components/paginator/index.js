import React from 'react';
import SelectLimit from './select_limit';
import {ArrowRepeat} from 'react-bootstrap-icons';
import {Button} from '../button';
const PAGE_AROUND = 2;

export default function Paginator({total, offset, limit, onChangePage, onChangeLimit, refetch}) {
  const totalPage = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit);
  const pageIndexed = [];
  for (let i = currentPage - PAGE_AROUND; i <= currentPage + PAGE_AROUND; i ++) {
    if (i < 0) continue;
    if (i >= totalPage) continue;
    pageIndexed.push(i);
  }

  return (
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </a>
        <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium"> {Math.min(offset + 1, total)} </span>
            to
            <span class="font-medium"> {Math.min(offset + limit, total)} </span>
            of
            <span class="font-medium"> {total} </span>
            results
          </p>
        </div>
        <div className="flex space-x-2">
          <SelectLimit
            value={limit}
            onChange={(newLimit) => {
              onChangeLimit(newLimit);
              onChangePage(0);
            }}
          />
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              onClick={() => onChangePage(0)}
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
            {pageIndexed.map((index) => (
              <a
                key={index}
                onClick={() => onChangePage(index)}
                className={index === currentPage
                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-3 py-2 border text-sm font-medium cursor-pointer"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-2 border text-sm font-medium cursor-pointer"
                }
              >
                {index + 1}
              </a>
            ))}
            <a
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              onClick={() => onChangePage(totalPage - 1)}
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
          <Button onClick={() => refetch()} color="secondary" className="ml-2" outline>
            <ArrowRepeat size={24}/>
          </Button>
        </div>
      </div>
    </div>
  );
}