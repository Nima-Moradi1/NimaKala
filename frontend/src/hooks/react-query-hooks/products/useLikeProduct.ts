import { likeProductApi } from "@/services/productServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useLikeProduct = () => {
    const queryClient = useQueryClient()
    const {isPending : isLiking , mutate : likeProduct} = useMutation({
        mutationFn : likeProductApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isLiking , likeProduct }
}