import { updateProductApi } from "@/services/productServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateProduct = () => {
    const {isPending : isUpdating , mutate : updateProduct} = useMutation({
        mutationFn : updateProductApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isUpdating , updateProduct }
}