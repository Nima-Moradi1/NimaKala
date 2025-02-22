/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CheckOTPForm from "@/components/auth/CheckOTPForm"
import SendOTPForm from "@/components/auth/SendOTPForm"
import { useCheckOTP } from "@/hooks/react-query-hooks/user/useCheckOTP"
import { useSendOTP } from "@/hooks/react-query-hooks/user/useSendOTP"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const AuthPage = () => {
const router = useRouter()
const [step,setStep] = useState(1) 
const [otp , setOtp] = useState('') ;
const [phoneNumber, setPhoneNumber] = useState<{ phoneNumber: string }>({ phoneNumber: '' })
const [time , setTime] = useState(0)
const [sendOtpResponse , setSendOtpResponse] = useState('')

const {isSendingOTP , sendOTP} = useSendOTP();
const {isCheckingOTP ,checkOTP} = useCheckOTP()



//? STEP 1 : Send the OTP code to the user 
const sendOtpHandler = (data: { phoneNumber: string }) => {
    try{
        sendOTP(data , {
            onSuccess : ({expiresIn , message}) => {
                setSendOtpResponse(message)
                setTime(expiresIn / 1000)
                setOtp('')
            }
        })
        setStep(2)
        setPhoneNumber({ phoneNumber: data.phoneNumber })
        // router.push('/')
    }catch(err) {
        console.log(err);
    }
    }

//? STEP 2 : Check the OTP user enters
const checkOtpHandler = useCallback(async () => {
    try {
        const data = {
            otp : otp ,
            phoneNumber : phoneNumber.phoneNumber
        }
        checkOTP(data , {
            onSuccess : ({user}) => {
                if(user.isActive === true){
                    router.push('/')
                    window.location.href = '/'
                }else {
                    router.push('/complete-profile')
                }
            }
        })
    } catch (err : any) {
        console.log(err);
    }
},[checkOTP,otp,phoneNumber,router])

//? STEP 3 : User should be able to go back to change the number
const moveBack = () => {
    setStep(1)
}

//? STEP 4 : set a time interval for user to re-send the code if necessary
useEffect(()=> {
   const timer = time > 0 && setInterval(()=> setTime((s)=> s - 1), 1000)
   //cleanup function
    return ()=> {
        if(timer) clearInterval(timer)
    }
},[time])

useEffect(() => {
    if (otp.length === 6) {
        checkOtpHandler()
    }
  }, [otp,checkOtpHandler]);

        const renderSteps = () => {
            switch (step) {
                case 1:
                 return <SendOTPForm isSendingOTP={isSendingOTP} onSubmit={sendOtpHandler}/>
                
            case 2: return <CheckOTPForm sendOtpResponse={sendOtpResponse} editPhoneNumber={moveBack}
              time={time} moveBack={moveBack} loading={isCheckingOTP}
              resendOtpHandler={()=>sendOtpHandler(phoneNumber)}
             onSubmit={checkOtpHandler} otp={otp} setOtp={setOtp}/>
                default: return null;
            }
        }
       

    return (
        <>
     {renderSteps()}
        </>
    )
}


export default AuthPage