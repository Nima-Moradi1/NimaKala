import * as dotenv from 'dotenv'
import type {Config} from 'drizzle-kit'

dotenv.config({
  path : ".env.local"
})

export default {
  schema: './server/schema.ts',
  out: './server/migrations',
  driver : 'pg' ,
  dbCredentials: {
    connectionString : process.env.POSTGRES_URL!
  },
} satisfies Config