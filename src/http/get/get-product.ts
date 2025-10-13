import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectProducts } from "../../functions/select-products.ts";

export const getProduct:FastifyPluginAsyncZod = async (server) => {
    server.get("/products", {
        preHandler: [server.authenticate]
    },async (request, reply) => {
        return await selectProducts()
    })
}