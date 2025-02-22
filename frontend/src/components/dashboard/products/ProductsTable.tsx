'use client'
import Table from '@/components/ui/Table';
import { toPersianDigits } from '@/utils/NumberFormatter';
import truncateText from '@/utils/TruncateText';
import { DeleteProduct, UpdateProduct } from './actionButtons';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ProductsTable =  ({products}) => {

//since backend does not handle pagination, we're handling it from frontend
//it's a little bit dirty code but we got no choice cuz of backend!!!
    const [currentPage, setCurrentPage] = useState(1);
    const productsNumber = products?.length as number
    const itemsPerPage = 4
    const totalPages = productsNumber%itemsPerPage === 0 ? Math.floor(productsNumber/itemsPerPage) : Math.floor(productsNumber/itemsPerPage)+1
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  if(!products) return <p>هیج محصولی یافت نشد</p>
  return (
    <div className='flex flex-col items-center'>
    <Table className='table'>
    <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>توضیحات</th>
        <th>دسته بندی</th>
        <th>برند</th>
        <th>موجود</th>
        <th>امتیاز</th>
        <th>لایک ها</th>
        <th>قیمت اولیه</th>
        <th>تخفیف</th>
        <th>قیمت با تخفیف</th>
        <th>تگ مرتبط</th>
        <th>عملیات</th>
    </Table.Header>
    <Table.Body>
        {displayedProducts.map((product, index:number)=> (
            <Table.Row key={product._id}>
                <td>{toPersianDigits(index + 1)}</td>
                <td>{truncateText(product.title , 20)}</td>
                <td>{truncateText(product.description , 20)}</td>
                <td>{truncateText(product.category.title , 20)}</td>
                <td>{product.brand}</td>
                <td>{toPersianDigits(product.countInStock)}</td>
                <td>{toPersianDigits(product.rating)}</td>
                <td>{toPersianDigits(product.likesCount)}</td>
                <td>{toPersianDigits(product.price)}ت</td>
                <td>{toPersianDigits(product.discount)}%</td>
                <td>{toPersianDigits(product.offPrice)}ت</td>
                <td>
                    <div className='flex flex-col gap-y-1'>
                    {product.tags.map((tag , index)=> (
                    <span className='border-b-2'
                     key={index}>{tag}</span>
                ))}
                    </div>
                    </td>
                <td>
                    <div className="flex items-center justify-center gap-x-3">
                {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                        <UpdateProduct id={product._id} />
                        <DeleteProduct product={product} />
                    </div>
                </td>
            </Table.Row>
        ))}
    </Table.Body>
    </Table>
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
              className={`p-2 rounded-full flex items-center w-10 justify-center border ${currentPage === page ? "bg-blue-500 text-white" : "bg-secondary-200"}`}
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
</div>
    
   
)
}

export default ProductsTable