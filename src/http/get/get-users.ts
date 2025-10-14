import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectUsers } from "../../functions/select-users.ts";

export const getUsers:FastifyPluginAsyncZod = async (server) => {
    server.get("/users_admin", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Cliente"],
            summary: "Listar todos os usuarios",
            description: "retornar os dados basicos de todos os users",
        }
    },async (request, reply) => {
        return await selectUsers()
    })
}