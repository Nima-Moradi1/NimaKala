import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/server/schema'


const sql = neon(process.env.POSTGRES_URL!);
//just added the logger to give me more details while logging
export const db = drizzle(sql, {schema , logger:true});

