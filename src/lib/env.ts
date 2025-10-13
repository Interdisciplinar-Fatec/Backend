import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().startsWith("postgres://"),
    JWT_KEY: z.string(),
    PASSWORD_ADMIN: z.string()
})

export const env = envSchema.parse(process.env)
