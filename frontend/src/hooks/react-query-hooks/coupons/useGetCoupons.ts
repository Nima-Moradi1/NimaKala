import { getAllCouponsApi } from "@/services/couponServices"
import { useQuery } from "@tanstack/react-query"


const useGetCoupons = () => {
  const {isLoading , error , data} =  useQuery({
        queryFn : getAllCouponsApi ,
        queryKey : ['get-coupons'] , 
        retry : false ,
        refetchOnWindowFocus : true , 
        refetchOnReconnect : true
    }
  ) 
    return {data , isLoading , error}
}

export default useGetCoupons