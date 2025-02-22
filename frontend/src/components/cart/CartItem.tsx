import React from 'react'
import ButtonIcon from '../ui/ButtonIcon'
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAddToCart } from '@/hooks/react-query-hooks/cart/useAddToCart'
import { useRemoveFromCart } from '@/hooks/react-query-hooks/cart/useRemoveFromCart'
import { toPersianNumbersWithComma } from '@/utils/NumberFormatter'

const CartItem = ({cartItem}) => {
  const productId = cartItem._id
  const {addToCart,isAdding} = useAddToCart()
  const {isRemoving,removeFromCart} = useRemoveFromCart()

  const decrementHandler = () => {
    try {
      removeFromCart({productId})
    } catch (error) {
      console.log(error);
    }
  }

   const addProductHandler = () => {
    try {
      addToCart({productId})
    } catch (error) {
      console.log(error);
    }
   }

  return (
    <div className='border rounded-xl p-4 flex justify-between mb-3'>
      <div>
        <span className='text-sm md:text-base font-bold'>{cartItem.title}</span> 
        <div className='text-xs md:text-sm xl:text-base my-2'>
          قیمت : {" "} 
          <span className={`${cartItem.discount ? "line-through text-gray-500" : "font-bold" } ` }>
            {toPersianNumbersWithComma(cartItem.price)} ت
          </span>
          {!!cartItem.discount && (
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{toPersianNumbersWithComma(cartItem.offPrice)}</p>
            <div className='bg-error px-2 py-1 rounded-xl text-white text-sm'>
              {toPersianNumbersWithComma(cartItem.discount)} %
            </div>
          </div>
        )}
        </div>
      </div>
   
    <div aria-disabled={isAdding || isRemoving} className='flex items-center justify-between gap-x-8'>
        <span>تعداد : {cartItem.quantity}</span>
        <div className='flex gap-x-3'>
            <ButtonIcon onClick={addProductHandler} disabled={isAdding}
             className='bg-primary-900 text-white rounded'
            ><PlusCircleIcon className='size-4' /></ButtonIcon>
            {cartItem.quantity > 1 ? <>
              <ButtonIcon disabled={cartItem.quantity < 1} onClick={decrementHandler}
             variant='outline' className='border rounded p-1 bg-inherit'
            ><MinusCircleIcon className='size-4' /></ButtonIcon>
            </> : <><ButtonIcon variant='outline' onClick={decrementHandler}
            ><TrashIcon className='size-4' stroke='red' /></ButtonIcon></>}
            
            
        </div>
    </div>
    </div>
  )
}

export default CartItem