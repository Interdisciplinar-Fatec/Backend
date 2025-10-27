import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUserId } from "../../functions/select-userId.ts";

export const getUserByCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/user/:id", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar os dados de um user com base no CPF",
            params: z.object({
                id: z.string()
            })
        }
    },async (request, reply) => {
        const { id } = request.params;
        return await selectOneUserId(id)
    })
}