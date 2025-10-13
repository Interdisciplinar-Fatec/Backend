import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUser } from "../../functions/select-user.ts";

export const getUserByCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/user/:CPF", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar os dados de um user com base no CPF",
            params: z.object({
                CPF: z.string()
            })
        }
    },async (request, reply) => {
        const { CPF } = request.params;

        return await selectOneUser(CPF)
    })
}