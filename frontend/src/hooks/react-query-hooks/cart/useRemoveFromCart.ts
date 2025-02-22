/* eslint-disable @typescript-eslint/no-explicit-any */
import { decrementFromCartApi } from "@/services/cartServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient()
    const {isPending : isRemoving , mutate : removeFromCart} = useMutation({
        mutationFn : decrementFromCartApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
        } ,
        onError : (err:any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isRemoving , removeFromCart }
}