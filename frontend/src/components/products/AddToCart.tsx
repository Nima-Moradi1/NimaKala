'use client'

import React from 'react'
import useGetUser from '@/hooks/react-query-hooks/user/useAuth'
import toast from 'react-hot-toast'
import { useAddToCart } from '@/hooks/react-query-hooks/cart/useAddToCart'
import SpinnerMini from '../ui/SpinnerMini'
import ButtonIcon from '../ui/ButtonIcon'
import { ArrowLeftEndOnRectangleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

const AddToCart = ({product , label = ''}) => {

    //? First make sure we have a loggedIn user to enable adding to cart
    const {data, isLoading} = useGetUser()
    const {user} = data || {}
    const {addToCart ,isAdding} = useAddToCart()
    const productId = product._id

    const isProductInCart = (user, product) => {
        if(!user) return false
        return user.cart?.products.some((p)=> p.productId === product._id)
    }

    const addToCartHandler = () => {
        if(!user) {
            toast.error('ابتدا وارد حساب کاربری خود شوید')
            window.location.href = '/auth'
            return ;
        }
         try {
            addToCart({productId})
         } catch(error) {
            console.log(error);
         }
    }

    if(isLoading) return (
        <div className='flex items-center w-full justify-center'
        ><SpinnerMini /></div>
    )
    

  return (
   <>
   {isProductInCart(user , product) ? <ButtonIcon onClick={()=> window.location.href = '/cart'}
    className='w-full py-2 rounded-xl' variant='outline'>
    <ArrowLeftEndOnRectangleIcon />
    <span className='text-primary-800'
    >ادامه سفارش</span>
   </ButtonIcon>
   : 
   <div>
       <ButtonIcon onClick={addToCartHandler}
       className='w-full py-2 border dark:border-gray-500 rounded-xl'>
   {isAdding ? <SpinnerMini /> : <>
   {label ? <>
    <PlusCircleIcon />
    <span>{label}</span>
   </> : 
   <>
   <PlusCircleIcon />
    <span className=''
    >افزودن به سبد خرید</span>
    </>}
   </>
   }
    
   </ButtonIcon>
    </div>
    }
   </> 
  )
}

export default AddToCart