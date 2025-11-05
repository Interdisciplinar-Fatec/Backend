import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectProductsDesactivated } from "../../functions/select-productsDesactivated.ts";

export const getOrderDesactivated:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/products/desactivated", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Listar todos os produtos desativados",
            description: "retornar os dados dos produtos desativados",
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
        const products = await selectProductsDesactivated()
        return reply.status(200).send(products)
    })
}