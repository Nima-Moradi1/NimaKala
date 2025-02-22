import React from 'react'
import Table from '../ui/Table'
import { toPersianDigits, toPersianNumbersWithComma } from '@/utils/NumberFormatter'
import toLocalDateShort from '@/utils/DateFormatter'
import Link from 'next/link'
import ErrorMsg from '../ui/ErrorMsg'

const UserPaymentsTable = ({payments}) => {

    
    if(payments.length <= 0) return <ErrorMsg msg={'شما هیچ پرداختی تا به الان انجام نداده اید'}/>
  return (
    <div>
         <Table className='table'>
            <Table.Header>
                <th>#</th>
                <th>شماره فاکتور</th>
                <th>سبد خرید</th>
                <th>مبلغ پرداخت شده</th>
                <th>تاریخ پرداخت</th>
                <th>وضعیت پرداخت</th>
            </Table.Header>
            <Table.Body>
                {payments.map((payment, index:number)=> (
                    <Table.Row key={payment._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{toPersianDigits(payment.invoiceNumber)}</td>
                        <td>{payment.cart?.productDetail?.map((pd)=> {
                            return (
                                <div key={pd._id} className='mb-2'>
                                    <Link href={`/profile/payments/product/${pd.slug}`}
                                    className='hover:underline'>
                                    {pd.title}
                                    </Link>
                                </div>
                            )
                        })}</td>
                        <td>{toPersianNumbersWithComma(payment.amount)}</td>
                        <td>{toLocalDateShort(payment.createdAt)}</td>
                        <td>{payment.status === 'COMPLETED' ? 
                            <><span 
                    className='text-white bg-green-600 p-2 rounded-xl'
                            >موفق</span></> : 
                            <><span
                            className='text-white bg-red-600 p-2 rounded-xl'
                            >ناموفق</span></>
                            }</td>
                        <td>
                            <div className="flex items-center justify-center gap-x-3">
                            </div>
                        </td>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
  )
}

export default UserPaymentsTable