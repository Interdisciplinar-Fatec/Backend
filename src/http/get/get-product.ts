import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectProducts } from "../../functions/select-products.ts";
import z from "zod";

export const getProduct:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/products", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Listar todos os produtos",
            description: "retornar os dados dos produtos",
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
        const products = await selectProducts()
        return reply.status(200).send(products)
    })
}