// we created this file because by default next-auth
// does not recognize the types of jwt session configs 
// we created. and we don't get typeSafety , so : 

import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendUser = DefaultSession["user"] & {
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
  image: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendUser
  }
}