import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials' 
import { LoginSchema } from "@/types/login-schema"
import { eq } from "drizzle-orm"
import { users } from "./schema"
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  session:{strategy:'jwt'},
  providers: [
    Google({
        clientId:process.env.GOOGLE_CLIENT_ID! ,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        //we allow this because of the conflict between github and google
        //(when we use the same email to login with both)
        allowDangerousEmailAccountLinking : true ,
    }) , 
    Github({
        clientId:process.env.GITHUB_ID! ,
        clientSecret : process.env.GITHUB_SECRET!,
        allowDangerousEmailAccountLinking : true
    }) , 
    Credentials({
      authorize : async (credentials, request) => {
        const validatedFields = LoginSchema.safeParse(credentials)
        if(validatedFields.success) {
          const user = await db.query.users.findFirst({
            where : eq(users.email , validatedFields.data.email)
          })
          if(!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(validatedFields.data.password,user.password)
          if(passwordMatch) return user
        }
        return null
      },
    })
  ],
})