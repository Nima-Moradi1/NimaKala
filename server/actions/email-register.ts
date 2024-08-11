'use server'
import bcrypt from 'bcrypt'
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users } from '../schema'

const action = createSafeActionClient()

export const emailRegister = 
action(RegisterSchema , async ({email , name , password}) => {

const hashedPassword = await bcrypt.hash(password, 10)
console.log(hashedPassword)

const existingUser = await db.query.users.findFirst({
    where : eq(users.email , email)
})
// check if the email is already in the database then say it's in the use!
//but if it's not , we have to register the user and send a verification !
if(existingUser) {
    if(!existingUser.emailVerified) {
        const verificationToken = ''
    }
    return {error : "Email already in use!"}
}
 return {success : "yayyy"}
})