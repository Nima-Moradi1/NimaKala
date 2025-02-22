import { updateCategoryApi } from "@/services/categoryServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateCategory = () => {
    const {isPending : isUpdating , mutate : updateCategory} = useMutation({
        mutationFn : updateCategoryApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isUpdating , updateCategory }
}