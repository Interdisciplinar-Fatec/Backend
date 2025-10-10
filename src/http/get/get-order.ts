import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectOrders } from "../../functions/select-orders.ts";

export const getOrder:FastifyPluginAsyncZod = async (server) => {
    server.get("/orders", {
        preHandler: [server.authenticate]
    },async (request, reply) => {
        return await selectOrders()
    })
}