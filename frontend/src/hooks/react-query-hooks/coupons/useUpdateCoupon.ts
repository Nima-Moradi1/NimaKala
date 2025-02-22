/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateCouponApi } from "@/services/couponServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient()
    const {isPending : isUpdating , mutate : updateCoupon} = useMutation({
        mutationFn : updateCouponApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : [
                    'get-coupons',
                    'get-one-coupon'
                ]
            })
        } ,
        onError : (err:any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isUpdating , updateCoupon }
}