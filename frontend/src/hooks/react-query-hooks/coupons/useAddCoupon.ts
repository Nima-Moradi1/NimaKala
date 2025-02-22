/* eslint-disable @typescript-eslint/no-explicit-any */
import { addCouponApi } from "@/services/couponServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddCoupon = () => {
    const queryClient = useQueryClient()
    const {isPending : isAdding , mutate : addCoupon} = useMutation({
        mutationFn : addCouponApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : [
                    'get-coupons'
                ]
            })
        } ,
        onError : (err:any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isAdding , addCoupon }
}