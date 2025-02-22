'use client'

import Button from "@/components/ui/Button"
import RHFTextField from "@/components/ui/RHFTextField"
import SpinnerMini from "@/components/ui/SpinnerMini"
import { useCompleteProfile } from "@/hooks/react-query-hooks/user/useCompleteProfile"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { CompleteProfileSchema } from "@/validation/Schemas"
import { useRouter } from "next/navigation"

const CompleteProfilePage = () => {
const router = useRouter()
const {register , formState : {errors} , handleSubmit} = useForm({
    mode : 'onTouched',
    resolver:yupResolver(CompleteProfileSchema)
})
const {completeProfile , isCompleting} = useCompleteProfile()

const onSubmit = (data:object) => {
    try {
        completeProfile(data ,{
            onSuccess : () => {
                router.push('/')
            }
        })
    } catch (error) {
        console.log(error);
    }
}
    return(
        <>
        <div className="flex justify-center items-center">
            <form className="form"
             onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField name="name" label="نام کامل" register={register} errors={errors} isRequired />
                <RHFTextField name="email" label="ایمیل" register={register} errors={errors} isRequired />
                <Button className="mt-5" disabled={isCompleting}
                >{isCompleting ? <SpinnerMini /> : 'تایید'}</Button>
            </form>
        </div>
        </>
    )
}

export default CompleteProfilePage