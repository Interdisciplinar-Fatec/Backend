import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectuserByEmail } from "../../functions/select-userByEmail.ts";

export const getUserByEmail: FastifyPluginAsyncZod = async (server) => {
    server.get("/user/email/:email", {
        schema: {
            tags: ["User", "Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar o id dele",
            params: z.object({
                email: z.string()
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
        const { email } = request.params;

        const user = await selectuserByEmail(email)
        if (user.length <= 0) return reply.status(404).send({ message: "Usuario não encontrado" })
        return reply.status(200).send(user)
    })
}