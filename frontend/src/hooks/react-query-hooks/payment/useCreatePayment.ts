/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPaymentApi } from "@/services/paymentServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreatePayment = () => {
    const queryClient =  useQueryClient()
    const {isPending : isCreating , mutate : createPayment} = useMutation({
        mutationFn : createPaymentApi , 
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
    return {isCreating , createPayment }
}