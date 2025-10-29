import postgres from "postgres";
import { env } from "../lib/env.ts";
import {drizzle} from "drizzle-orm/postgres-js"
import { schema } from "./schemas/index.ts";

const isProduction = process.env.NODE_ENV === "production"

export const sql = postgres(env.DATABASE_URL, {
    ssl: isProduction ? { rejectUnauthorized: false } : undefined
})
export const db = drizzle(sql, {
    schema,
    casing: "snake_case"
    
})
