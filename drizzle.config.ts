import {defineConfig} from "drizzle-kit"
import { env } from "./src/lib/env.ts"

export default defineConfig({
    dialect: "postgresql",
    casing:"snake_case",
    schema: "./src/db/schemas/**.ts",
    out: "./src/db/migrations",
    dbCredentials: {
        url: env.DATABASE_URL
    }
})