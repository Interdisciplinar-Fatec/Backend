import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUserId } from "../../functions/select-userById.ts";

export const getUserById: FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/user/:id", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar os dados de um user com base no CPF",
            params: z.object({
                id: z.string()
            }),
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        name: z.string(),
                        CPF: z.string(),
                        data_nascimento: z.string(),
                        endereco: z.string(),
                        telefone: z.string(),
                        email: z.string(),
                        created_at: z.date()
                    })
                )
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        const user = await selectOneUserId(id)
        return reply.status(200).send(user)
    })
}