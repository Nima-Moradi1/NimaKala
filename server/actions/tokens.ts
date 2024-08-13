'use server'

import { eq } from "drizzle-orm"
import { db } from ".."
import { emailTokens } from "../schema"

// in this function we basically just check if we have a v-t in our db with that email and return it!
export const generateEmailVerificationTokenByEmail = async (email:string) => {

    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where : eq(emailTokens.token , email)
        })
        return verificationToken
    } catch(error) {
        return {error : null}
    }
}

export const generateEmailVerificationToken = async (email:string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await generateEmailVerificationTokenByEmail(email)
    // so if it exists , then get rid of it ! (داریم زحمت میکشیم اینجا !)
    if(existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id , email))
    }
// then the new v-t is going to be inserted here in the emailTokens table !
    const verificationToken = await db.insert(emailTokens).values({
        email,
        expires,
        token,
        // now <<id>> is not required ! because if we don't even pass it , 
        // we have the "createId()" function to make it for us in the <schema.ts>

        //returning() is basically just to return all the values !
    }).returning()
    return verificationToken
}