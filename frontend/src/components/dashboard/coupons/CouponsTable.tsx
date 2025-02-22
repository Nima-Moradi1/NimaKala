'use client'
import Table from '@/components/ui/Table';
import { toPersianDigits, toPersianNumbersWithComma } from '@/utils/NumberFormatter';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import toLocalDateShort from '@/utils/DateFormatter';
import useGetCoupons from '@/hooks/react-query-hooks/coupons/useGetCoupons';
import Fallback from '@/components/ui/Fallback';
import { DeleteCouponBtn, UpdateCouponBtn } from './couponActionBtns';
import Link from 'next/link';

const CouponsTable =  () => {

  const {data,isLoading} = useGetCoupons()
  const {coupons} = data || {}
//since backend does not handle pagination, we're handling it from frontend
//it's a little bit dirty code but we got no choice cuz of backend!!!
    const [currentPage, setCurrentPage] = useState(1);
    const productsNumber = coupons?.length as number
    const itemsPerPage = 4
    const totalPages = productsNumber%itemsPerPage === 0 ? Math.floor(productsNumber/itemsPerPage) : Math.floor(productsNumber/itemsPerPage)+1
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedCoupons = coupons?.slice(startIndex, startIndex + itemsPerPage);
  
  if(isLoading) return <Fallback />
  if(!coupons) return <p>هیج کد تخفیفی یافت نشد</p>
  
  return (
    <div className='flex flex-col items-center'>
    <Table className='table'>
    <Table.Header>
        <th>#</th>
        <th>کد</th>
        <th>نوع</th>
        <th>مقدار</th>
        <th>انقضا</th>
        <th>محدودیت</th>
        <th>استفاده شده</th>
        <th>وضعیت</th>
        <th>محصول</th>
        <th>عملیات</th>
    </Table.Header>
    <Table.Body>
        {displayedCoupons.map((coupon, index:number)=> (
            <Table.Row key={coupon._id}>
                <td>{toPersianDigits(index + 1)}</td>
                <td>
                  <span className='font-extrabold'
                  >{coupon.code}</span>
                </td>
                <td>{coupon.type === "percent" ? "درصد" : "مبلغ تومانی"}</td>
                <td>{toPersianNumbersWithComma(coupon.amount)}
                  <span>{coupon.type === "percent" ? "٪" : " ت "}</span>
                </td>
                <td>{toLocalDateShort(coupon.expireDate)}</td>
                <td>{toPersianDigits(coupon.usageLimit)} بار</td>
                <td>{toPersianDigits(coupon.usageCount)} بار</td>
                <td>
                  <div 
                  className={`${coupon.isActive ? 'bg-green-600' : 'bg-error' } w-12 flex rounded-lg
                   items-center justify-center py-1 px-2 text-centerrounded-full text-white`}>
                    <span>{coupon.isActive === true ? "فعال" : "غیرفعال"}</span></div>
                </td>
                <td>{coupon.productIds?.map((product)=> {
                  return (
                    <div key={product._id}
                    className='flex flex-col mb-1'>
                      <Link className='hover:underline'
                      href={`/admin/dashboard/products/${product._id}`}>
                      <span>
                      # {product.title}
                    </span>
                      </Link>
                    </div>
                    
                  )
                })}</td>
                <td>
                    <div className="flex items-center justify-center gap-x-3">
                {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                        <UpdateCouponBtn id={coupon._id} />
                        <DeleteCouponBtn coupon={coupon} />
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

export default CouponsTable