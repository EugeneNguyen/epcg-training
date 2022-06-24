import React from 'react';
import SelectLimit from './select_limit';
import {Button} from '../button';

const PAGE_AROUND = 2;

function IconTable() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
         strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
         strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
         strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
    </svg>
  )
}

function IconArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
         strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
    </svg>
  )
}

export default function Paginator({total, offset, limit, onChangePage, onChangeLimit, refetch}) {
  const totalPage = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit);
  const pageIndexed = [];
  for (let i = currentPage - PAGE_AROUND; i <= currentPage + PAGE_AROUND; i++) {
    if (i < 0) continue;
    if (i >= totalPage) continue;
    pageIndexed.push(i);
  }

  return (
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="#"
           class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </a>
        <a href="#"
           class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
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
              <IconArrowLeft/>
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
              <IconArrowRight/>
            </a>
          </nav>
          <Button onClick={() => refetch()} color="secondary" className="ml-2" outline>
            <IconRefresh/>
          </Button>
          <Button onClick={() => refetch()} color="secondary" className="ml-2" outline>
            <IconTable/>
          </Button>
        </div>
      </div>
    </div>
  );
}