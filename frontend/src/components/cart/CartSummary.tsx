import { toPersianNumbersWithComma } from '@/utils/NumberFormatter'
import React from 'react'
import ButtonIcon from '../ui/ButtonIcon'
import { PlayCircleIcon } from '@heroicons/react/24/outline'
import { useCreatePayment } from '@/hooks/react-query-hooks/payment/useCreatePayment'
import SpinnerMini from '../ui/SpinnerMini'

const CartSummary = ({payDetail}) => {
    const {totalOffAmount , totalPrice , totalGrossPrice} = payDetail || {}

    const {createPayment, isCreating} = useCreatePayment()
    const createPaymentHandler = () => {
        try {
            createPayment()
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <div className='w-full h-full rounded-xl p-3 border'>
        <p className='mb-4 font-bold'>اطلاعات پرداخت</p>
        <div className='mb-4 flex items-center justify-between px-1'>
            <span>جمع کل : </span>
            <span>{toPersianNumbersWithComma(totalGrossPrice)} تومان</span>
        </div>
        <div className='mb-4 flex items-center justify-between px-1'>
            <span>تخفیف :‌</span>
            <span className='text-error'
            >{toPersianNumbersWithComma(totalOffAmount)} - تومان</span>
        </div>
        <div className='mb-4 flex items-center justify-between px-1 font-extrabold'>
            <span
            >مبلغ قابل پرداخت  : </span>
            <span>{toPersianNumbersWithComma(totalPrice)} تومان </span>
        </div>
        <ButtonIcon className='py-3' variant='primary' disabled={isCreating}
        onClick={createPaymentHandler}>
            {isCreating ? <SpinnerMini /> : <><PlayCircleIcon />
                <span> ثبت سفارش </span></>}
        </ButtonIcon> 
    </div>
  )
}

export default CartSummary