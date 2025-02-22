import { checkOTPApi } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCheckOTP = () => {
    const {isPending : isCheckingOTP , mutateAsync : checkOTP} = useMutation({
        mutationFn : checkOTPApi , 
        onSuccess : (data : {message : string , user : {isActive : boolean}})=> {
            toast.success(data.message)
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isCheckingOTP , checkOTP}
}