import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectUserByCPF } from "../../functions/select-userByCPF.ts";
import { env } from "../../lib/env.ts";

export const getUserByCPF: FastifyPluginAsyncZod = async (server) => {
    server.get("/user/cpf/:CPF", {
        schema: {
            tags: ["User", "Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar o id dele",
            params: z.object({
                CPF: z.string()
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
                ),
                404: z.object({
                    message: z.string()
                }),
            }
        }
    }, async (request, reply) => {
        const { CPF } = request.params;

        const user = await selectUserByCPF(CPF)
        if (user.length <= 0) return reply.status(404).send({ message: "Usuario não encontrado" })

        return reply.status(200).send(user)
    })
}