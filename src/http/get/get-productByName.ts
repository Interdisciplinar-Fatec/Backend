import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectProductName } from "../../functions/select-productName.ts";

export const getProdcutByName:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/product/:nome", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Busca de produtos",
            description: "retornar os dados de um produto com base no nome",
            params: z.object({
                nome: z.string()
            }),
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        nome: z.string(),
                        preco: z.number(),
                        marca: z.string(),
                        descricao: z.string().nullable(),
                    })
                )
            }
        }
    },async (request, reply) => {
        const {nome} = request.params

        const nome_normalizado = nome.toLowerCase().trim()
        const prodct =  await selectProductName(nome_normalizado)
        return reply.status(200).send(prodct)
    })
}