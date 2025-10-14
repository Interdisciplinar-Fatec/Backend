import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectProductName } from "../../functions/select-productName.ts";

export const getProdcutByName:FastifyPluginAsyncZod = async (server) => {
    server.get("/product_admin/:nome", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Produtos"],
            summary: "Busca de produtos",
            description: "retornar os dados de um produto com base no nome",
            params: z.object({
                nome: z.string()
            })
        }
    },async (request, reply) => {
        const {nome} = request.params

        const nome_normalizado = nome.toLowerCase().trim()
        return await selectProductName(nome_normalizado)
    })
}