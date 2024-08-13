'use server'
import bcrypt from 'bcrypt'
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users } from '../schema'
import { generateEmailVerificationToken } from './tokens'
import { sendVerificationEmail } from './resend'
//for type-safe server action handling
const action = createSafeActionClient()

export const emailRegister = 
action(RegisterSchema , async ({email , name , password}) => {
// we need to hash the password then save it in the db!
const hashedPassword = await bcrypt.hash(password, 10)

// check if the email is already in the database then say it's in the use!
//but if it's not , we have to register the user and send a verification !
const existingUser = await db.query.users.findFirst({
    where : eq(users.email , email)
})

if(existingUser) {
    if(!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email)
        //resend >> we send an email for verification
        await sendVerificationEmail(
            verificationToken[0].email,
            verificationToken[0].token
            )

        return {success : 'Email Confirmation Resent!'}
    }
    return {error : "Email already in use!"}
}
 // if the email is not registered, then insert it in the db>> users table
 await db.insert(users).values({
    email,
    name,
    password : hashedPassword
 })
 const verificationToken = await generateEmailVerificationToken(email)
 //then again, we send a confirmation email with Resend!
 await sendVerificationEmail(
    verificationToken[0].email,
    verificationToken[0].token
    )
 return {success : "Confirmation Email Sent!"}
})