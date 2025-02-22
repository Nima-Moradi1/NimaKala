import { sendOTPApi } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useSendOTP = () => {
    const {isPending : isSendingOTP , mutate : sendOTP} = useMutation({
        mutationFn : sendOTPApi , 
        onSuccess : (data : {message : string , expiresIn : number})=> {
            const resendTime = data.expiresIn
            toast.success(data.message)
            return resendTime
        } ,
        onError : (err:{response}) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isSendingOTP , sendOTP }
}