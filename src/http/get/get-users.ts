import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectUsers } from "../../functions/select-users.ts";

export const getUsers:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/users", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Cliente"],
            summary: "Listar todos os usuarios",
            description: "retornar os dados basicos de todos os users",
        }
    },async (request, reply) => {
        return await selectUsers()
    })
}