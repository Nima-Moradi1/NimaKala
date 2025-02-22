'use client'

import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"
import ErrorMsg from "@/components/ui/ErrorMsg"
import Fallback from "@/components/ui/Fallback"
import useGetUser from "@/hooks/react-query-hooks/user/useAuth"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const CartPage = () => {

  const {data , isLoading} = useGetUser()
  const {user , cart} = data || {}


if(isLoading) { return (
    <div className="flex items-center justify-center w-full">
      <Fallback />
    </div>
  )}
  
if(!user || !data) {
  return (
    <div className="container lg:max-w-screen-lg mx-auto">
      <ErrorMsg msg={'برای مشاهده سبد خرید لطفا ابتدا لاگین کنید'}/>
      <Link href='/auth'
      className="text-xl text-center font-bold text-primary-900 hover:text-primary-700 transition duration-200"
      >رفتن به صفحه لاگین ؟</Link>
    </div>
  )
}

if(!user?.cart?.products || user?.cart?.products?.length === 0) {
  return (
      <div className="flex lg:text-xl gap-y-4
       flex-col items-center justify-center lg:max-w-screen-lg mx-auto text-center w-full h-[70vh]">
     <ErrorMsg msg={'سبد خرید شما خالی است'}/>
      <Link
      className="text-xl lg:text-2xl group
       flex gap-x-4 items-center justify-center font-bold text-primary-800 hover:text-primary-700 transition duration-200"
      href='/products'
      >
      <ArrowLeftIcon className="size-5 group-hover:-translate-x-2 transition-all duration-300"/>
        <span>
        رفتن به صفحه محصولات 
        </span>
      </Link>
        
    </div>
  )
}
 

  return (
  <div className="md:grid md:grid-cols-5 md:gap-7 flex flex-col gap-5 p-2">
     <div className="col-span-3">
    {cart && cart.productDetail.map((item)=> {
      return (
        <CartItem cartItem={item} key={item._id} />
      )
    })}
   </div>
   <div className="col-span-2">
    <CartSummary payDetail={cart.payDetail}/>
   </div>
  </div>
  )
}

export default CartPage