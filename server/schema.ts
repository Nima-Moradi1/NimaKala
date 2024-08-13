import { boolean, integer, pgEnum, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters"
import {createId} from '@paralleldrive/cuid2'



export const RoleEnum = pgEnum('roles' , ['user' , 'admin'])

export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    twoFactorEnabled : boolean('twoFactorEnabled').default(false),
    role : RoleEnum('roles').default('user'),
    password : text('password'),
  })
   
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        //the reference basically is a connection to users schema
        //which will delete the user if the account is deleted 
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccount>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
  export const emailTokens = pgTable(
    "email_tokens",
    {
      // here, we used createId() as a default function to create us id
      // because if it don't , we have to create id ourselves in schema and that's a nightmare!
      id: text("id").notNull().$defaultFn(()=> createId()),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
      email : text('email').notNull()
    },
    // this indexing is good for querying and organizing the database
    // finds your unique request faster based on merging both token and id
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.id, verificationToken.token],
      }),
    })
  )

  export const passwordResetTokens = pgTable(
    "password_reset_tokens",
    {
      // here, we used createId() as a default function to create us id
      // because if it don't , we have to create id ourselves in schema and that's a nightmare!
      id: text("id").notNull().$defaultFn(()=> createId()),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
      email : text('email').notNull()
    },
    // this indexing is good for querying and organizing the database
    // finds your unique request faster based on merging both token and id
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.id, verificationToken.token],
      }),
    })
  )

  export const twoFactorTokens = pgTable(
    "two-factor-tokens",
    {
      // here, we used createId() as a default function to create us id
      // because if it don't , we have to create id ourselves in schema and that's a nightmare!
      id: text("id").notNull().$defaultFn(()=> createId()),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
      email : text('email').notNull()
    },
    // this indexing is good for querying and organizing the database
    // finds your unique request faster based on merging both token and id
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.id, verificationToken.token],
      }),
    })
  )