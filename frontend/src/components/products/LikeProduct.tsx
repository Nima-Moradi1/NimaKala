'use client'

import { useLikeProduct } from "@/hooks/react-query-hooks/products/useLikeProduct"
import { HeartIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"


const LikeProduct = ({product}) => {
  const router = useRouter()

  const {isLiking,likeProduct} = useLikeProduct()
  const likeHandler =  () => {
    try {
      likeProduct(product._id)
      router.refresh()
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <button className="size-5" onClick={likeHandler} disabled={isLiking}>
    <HeartIcon stroke="red" fill={`${product.isLiked ? 'red' : "white" }`}/>
   </button>
  )
}

export default LikeProduct