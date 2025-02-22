'use client'
import Table from '@/components/ui/Table';
import { toPersianDigits, toPersianNumbersWithComma } from '@/utils/NumberFormatter';
import truncateText from '@/utils/TruncateText';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ProductsTable =  ({payments}) => {
console.log(payments);
//since backend does not handle pagination, we're handling it from frontend
//it's a little bit dirty code but we got no choice cuz of backend!!!
    const [currentPage, setCurrentPage] = useState(1);
    const productsNumber = payments?.length as number
    const itemsPerPage = 4
    const totalPages = productsNumber%itemsPerPage === 0 ? Math.floor(productsNumber/itemsPerPage) : Math.floor(productsNumber/itemsPerPage)+1
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedPayments = payments.slice(startIndex, startIndex + itemsPerPage);
  
  if(!payments) return <p className='text-error m-10'>هیج پرداختی یافت نشد</p>
  return (
    <div className='flex flex-col items-center'>
         <Table className='table'>
    <Table.Header>
        <th>#</th>
        <th>نام خریدار</th>
        <th>شماره همراه</th>
        <th>مبلغ سفارش</th>
        <th>وضعیت پرداخت</th>
        <th>کد رهگیری</th>
        <th>محصولات</th>
    </Table.Header>
    <Table.Body>
        {displayedPayments.map((payment, index:number)=> (
            <Table.Row key={payment?._id}>
                <td>{toPersianDigits(index + 1)}</td>
                <td>{truncateText(payment?.user?.name , 20)}</td>
                <td>{toPersianDigits(payment?.user?.phoneNumber)}</td>
                <td>{toPersianNumbersWithComma(payment?.amount)}</td>
                <td>{payment?.status === "COMPLETED" ? 
                   <div className='w-12 mx-auto bg-green-600 text-white flex items-center justify-center p-1 rounded-xl'> 
                    <span>موفق</span></div>
                : 
                <div className='w-12 mx-auto bg-error text-white flex items-center justify-center p-1 rounded-xl'> 
                    <span>ناموفق</span></div>
                    }</td>
                <td>{toPersianDigits(payment?.invoiceNumber)}</td>
                <td>{payment?.cart?.productDetail.map((product)=> {
                    return (
                        <Link className='hover:underline'
                         key={product._id} href={`/admin/dashboard/products/${product._id}`}>
                        <span>+ {product.title}</span>
                        </Link>
                    )
                })}</td>
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
</div>
    
   
)
}

export default ProductsTable