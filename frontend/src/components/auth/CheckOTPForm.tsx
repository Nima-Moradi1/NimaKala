'use client'

import Button from "../ui/Button"
import OTPInput from 'react-otp-input'
import { useForm } from "react-hook-form"
import SpinnerMini from "../ui/SpinnerMini"
import ButtonIcon from "../ui/ButtonIcon"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

const CheckOTPForm = ({onSubmit , otp , setOtp , loading , moveBack , time , resendOtpHandler , sendOtpResponse ,editPhoneNumber}) => {


    const {handleSubmit , register} = useForm({
        mode : 'onSubmit'
    })

    return (
        <>
        <div className="flex flex-col items-center gap-y-10 m-3">
        <ButtonIcon className="ml-80 md:ml-96 border-none w-1/4 hover:bg-inherit" variant="outline"
        onClick={moveBack}>
                <ArrowRightIcon className="size-7"/>
            </ButtonIcon>
            {sendOtpResponse ? 
            <div className="flex gap-3 items-center justify-center text-xs md:text-base">
                <span>{sendOtpResponse}</span>
            <span onClick={editPhoneNumber}
            className="hover:underline text-primary-500">ویرایش شماره</span></div> 
            : <></>}
            <form onSubmit={handleSubmit(onSubmit)} className="form space-y-5">
                <h2 className="h2">کد تایید را وارد کنید</h2>
                <OTPInput value={otp} onChange={setOtp} numInputs={6} 
                renderSeparator={<span> - </span>}
                inputStyle={{
                    width : "2.3rem" , padding : '0.5rem 0.2rem',
                    margin : "auto" ,
                    border : '1px solid rgb(var(--color-primary-300))',
                    borderRadius : '0.5rem' , 
                }}
                containerStyle= 'flex flex-row-reverse gap-x-2 justify-center'
                renderInput={(props)=> <input
                {...register('otp')} {...props} />}/>
                <Button>
                    {loading ? <SpinnerMini /> : 'تایید'}
                </Button>
            </form>
            {time > 0 ? 
            <>
            {time} ثانیه تا ارسال دوباره کد
            </> 
            :
            <div className="flex flex-col gap-y-5 mt-10">
            <p>کد برایتان ارسال نگردید ؟</p>
            <Button className="max-w-screen-sm mx-auto" variant="outline"
             onClick={resendOtpHandler}>
                ارسال مجدد کد
            </Button>
            </div>
            }
        </div>
        </>
    )
}

export default CheckOTPForm