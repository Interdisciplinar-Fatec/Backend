import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectUsers } from "../../functions/select-users.ts";

export const getUsers:FastifyPluginAsyncZod = async (server) => {
    server.get("/users", {
        preHandler: [server.authenticate]
    },async (request, reply) => {
        return await selectUsers()
    })
}