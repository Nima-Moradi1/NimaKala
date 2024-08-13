'use client'

import { newVerification } from "@/server/actions/tokens"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useEffect } from "react"
import { AuthCard } from "./auth-card"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"


export const EmailVerificationForm = () => {
    const token = useSearchParams().get('token')
    const router = useRouter()
const [error , setError] = React.useState("")
const [success , setSuccess] = React.useState("")


const handleVerification = useCallback(()=> {
    if(success || error) return
    if(!token) {
        setError('Token Not Found!')
        return
    }
    newVerification(token).then((data)=> {
        if(data.error) {
            setError(data.error)
        } if (data.success) {
            setSuccess(data.success)
            router.push('/auth/login')
        }
    })
},[]) 
        useEffect(()=> {
            handleVerification()
            },[])


    return (
        <>
        <AuthCard cardTitle="Verify your account"
        backButtonLabel="Back to Login" backButtonHref="/auth/login">
        <div className="flex items-center flex-col w-full justify-center gap-3">
            <p>{!success && !error ? "Verifying email..." : null}</p>
            <FormSuccess message={success} />
            <FormError message={error}/>
        </div>
        </AuthCard>
        </>
    )
}