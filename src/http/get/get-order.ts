import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectOrders } from "../../functions/select-orders.ts";

export const getOrder:FastifyPluginAsyncZod = async (server) => {
    server.get("/orders_admin", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Pedidos"],
            summary: "Listar todos os pedidos",
            description: "retornar os dados dos pedidos, como data e usuario",
        }
    },async (request, reply) => {
        return await selectOrders()
    })
}