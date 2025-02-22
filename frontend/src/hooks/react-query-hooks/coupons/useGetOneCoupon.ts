import { getAllCouponsApi } from "@/services/couponServices"
import { useQuery } from "@tanstack/react-query"


const useGetOneCoupon = (id) => {
  const {isLoading , error , data} =  useQuery({
        queryKey : ['get-one-coupon', id] , 
        queryFn : ()=> getAllCouponsApi(id) ,
        retry : false ,
        refetchOnWindowFocus : true , 
        refetchOnReconnect : true
    }
  ) 
    return {data , isLoading , error}
}

export default useGetOneCoupon