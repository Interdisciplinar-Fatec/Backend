import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";

export const getUsers:FastifyPluginAsyncZod = async (server) => {
    server.get("/users", async (request, reply) => {
        return await db.select({
            id: schema.users.id,
            name: schema.users.name,
            email: schema.users.email,
            CPF: schema.users.CPF,
            crated_at: schema.users.createdAt
        }).from(schema.users)
    })
}