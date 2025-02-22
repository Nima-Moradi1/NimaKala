'use client'

import Button from "@/components/ui/Button"
import RHFTextField from "@/components/ui/RHFTextField"
import SpinnerMini from "@/components/ui/SpinnerMini"
import { convertToEnglishNumbers } from "@/utils/NumberFormatter"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { sendOTPSchema } from "../../validation/Schemas"

const SendOTPForm = ({onSubmit , isSendingOTP}) => {

    const {register ,setValue, formState : {errors} , handleSubmit } = useForm({
        mode : 'onTouched',
        resolver : yupResolver(sendOTPSchema)
    })
    
  
return (
    <div className="flex flex-col items-center justify-center xl:max-w-screen-xl m-3">
    <form className="form"
    onSubmit={handleSubmit(onSubmit)}>
        <h2 className="h2">ورود به حساب کاربری</h2>
    <RHFTextField label="شماره همراه" name="phoneNumber" register={register}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInput={(e:any) => {
        const value = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
        const englishValue = convertToEnglishNumbers(value);
        setValue("phoneNumber", englishValue); // Set the cleaned value
      }}
    dir="ltr" errors={errors} isRequired type="text" validationSchema={sendOTPSchema}/>
    <Button className="flex items-center justify-center"
     disabled={isSendingOTP}  type="submit">
        {isSendingOTP ? <SpinnerMini /> : 'ارسال کد'}
    </Button>
    </form>
</div>
)
}

export default SendOTPForm