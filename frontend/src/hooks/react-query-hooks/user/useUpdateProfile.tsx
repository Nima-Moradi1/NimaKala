import { updateUserProfileApi } from "@/services/authServices"
import { QueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { pathRevalidator } from "@/utils/RevalidatePath"

export const useUpdateProfile = () => {
    const queryClient = new QueryClient()
    const {isPending : isUpdating , mutate : updateProfile} = useMutation({
        mutationFn : updateUserProfileApi , 
        onSuccess : async (data : {message : string})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
           await pathRevalidator('/', 'layout')
           
        } ,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError : (err: any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isUpdating , updateProfile }
}