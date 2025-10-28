import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectUsers } from "../../functions/select-users.ts";
import z from "zod";

export const getUsers:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/users", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Cliente"],
            summary: "Listar todos os usuarios",
            description: "retornar os dados basicos de todos os users",
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                        crated_at: z.date()
                    })
                )
            }
        }
    },async (request, reply) => {
        const users = await selectUsers()
        return reply.status(200).send(users)
    })
}