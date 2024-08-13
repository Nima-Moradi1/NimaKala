'use server'

import { NewPasswordSchema } from "@/types/new-password-schema"
import { createSafeActionClient } from "next-safe-action"
import { getPasswordResetTokenByToken } from "./tokens"
import { db } from ".."
import { eq } from "drizzle-orm"
import { passwordResetTokens, users } from "../schema"
import bcrypt from 'bcrypt'
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"


const action = createSafeActionClient()
export const newPassword = 
action(NewPasswordSchema , async({password,token}) => {

//*** since http method is not supporting Transactions, we need to use websockets(pools in neon-db) for this password reset
const pool = new Pool({connectionString : process.env.POSTGRES_URL})
const poolToDrizzle = drizzle(pool)
    // first of all , check if we have a token !
    if(!token) {
        return {error : "Missing Token!"}
    }

    // check if the the token is valid (it's the actual token!)
    const existingToken = await getPasswordResetTokenByToken(token)
    if(!existingToken) return {error : "Token not found!"}

    const hasExpired = new Date(existingToken.expires) < new Date()
    if(hasExpired) return {error : "Token has expired"}

    const existingUser = await db.query.users.findFirst({
        where:eq(users.email , existingToken.email)
    })
    if(!existingUser) return {error : "User not Found!"}
    const hashedPassword = await bcrypt.hash(password,10)
// a transaction is a method that allows you to revert all other methods
//(in other tables that may be connected) if one of them goes wrong which is cool!
    await poolToDrizzle.transaction(async(tx) => {
        await tx.update(users).set({
            password:hashedPassword ,
        })
        .where(eq(users.id,existingUser.id))
        //then of course,since we don't need the token , we gotta delete it
        await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id,existingToken.id))
    })
    return {success : "Password Updated!"}
}
)