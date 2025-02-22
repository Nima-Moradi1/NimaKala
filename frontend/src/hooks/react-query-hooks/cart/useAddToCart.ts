/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToCartApi } from "@/services/cartServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddToCart = () => {
    const queryClient =  useQueryClient()
    const {isPending : isAdding , mutate : addToCart} = useMutation({
        mutationFn : AddToCartApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
        }, 
        
        onError : (err:any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isAdding , addToCart }
}