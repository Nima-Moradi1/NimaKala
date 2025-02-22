import { completeProfileApi } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCompleteProfile = () => {
    const {isPending : isCompleting , mutate : completeProfile} = useMutation({
        mutationFn : completeProfileApi , 
        onSuccess : (data : {message : string})=> {
            toast.success(data.message)
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isCompleting , completeProfile }
}