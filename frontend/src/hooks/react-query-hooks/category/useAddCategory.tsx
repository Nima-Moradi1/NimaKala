import { addCategoryApi } from "@/services/categoryServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddCategory = () => {
    const {isPending : isAdding , mutate : addCategory} = useMutation({
        mutationFn : addCategoryApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isAdding , addCategory }
}