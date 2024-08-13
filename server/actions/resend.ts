'use server'
//in this component we set the configuration of Resend to send emails

import getBaseURL from "@/lib/base-url"
import {Resend} from 'resend'


const resend = new Resend()
const domain = getBaseURL()

export const sendVerificationEmail = async (email: string,token:string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    const {data , error} = await resend.emails.send({
        from: 'Nima <onboarding@resend.dev>',
        to : email, 
        subject : "NimaKala - Confirmation Email" , 
        html: `<p>Click to <a href='${confirmLink}'>Confirm your Email</a></p>`
    })
    if(error) return console.log(error)
        if(data) return data
}