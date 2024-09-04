import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials' 
import { LoginSchema } from "@/types/login-schema"
import { eq } from "drizzle-orm"
import { accounts, users } from "./schema"
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  session:{strategy:'jwt'},

  callbacks: {
    // the jwt session we created is not gonna work unless we save it into the session , so :
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as string
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
        session.user.image = token.image as string
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      })
      if (!existingUser) return token
      const existingAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      })

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.twoFactorEnabled
      token.image = existingUser.image
      return token
    },
  },
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