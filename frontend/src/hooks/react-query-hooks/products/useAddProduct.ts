/* eslint-disable @typescript-eslint/no-explicit-any */
import { addProductApi } from "@/services/productServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddProduct = () => {
    const {isPending : isAdding , mutate : addProduct} = useMutation({
        mutationFn : addProductApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
        } ,
        onError : (err:any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isAdding , addProduct }
}