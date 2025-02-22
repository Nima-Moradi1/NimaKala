'use client'

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const FrontPaginate = ({products}) => {

 const [currentPage, setCurrentPage] = useState(1);
    const productsNumber = products?.length as number
    const itemsPerPage = 4
    const totalPages = productsNumber%itemsPerPage === 0 ? Math.floor(productsNumber/itemsPerPage) : Math.floor(productsNumber/itemsPerPage)+1
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);


  return (
    
    <div>
         {/* Pagination Controls */}
     <div className="flex items-center gap-4 mt-4">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='disabled:bg-inherit disabled:border-gray-300 border-black border rounded-full p-1'
        >
          <ArrowRightIcon className='size-6'/>
        </button>
        {/* Page Numbers */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`p-2 rounded-full flex items-center w-10 justify-center border ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <span>{page}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='disabled:bg-inherit disabled:border-gray-300 border-black border rounded-full p-1'
        >
          <ArrowLeftIcon className='size-6'/>
        </button>
      </div>
      {displayedProducts}
    </div>
  )
}

export default FrontPaginate