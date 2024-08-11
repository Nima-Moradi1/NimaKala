'use server'

import { LoginSchema } from "@/types/login-schema";
// a fantastic library for typesafe server actions in nextjs! 
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const action = createSafeActionClient();

export const emailSignin = action(LoginSchema , async ({email , password , code}) => {
    //check if the user is in the database
    const existingUser = db.query.users.findFirst({
        where : eq(users.email , email)
    })
    if(existingUser?._.result?.email !== email) {
        return {error : "Email not found!"}
    }
    //we don't have to do this for github and google
    //because they already verify the email for us!
    if(!existingUser?._.result?.emailVerified) {
         //here we should send email verifications
    }
    console.log(email , password , code)
    return {success : email}
})