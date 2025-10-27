import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectProducts } from "../../functions/select-products.ts";

export const getProduct:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/products", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Listar todos os produtos",
            description: "retornar os dados dos produtos",
        }
    },async (request, reply) => {
        return await selectProducts()
    })
}