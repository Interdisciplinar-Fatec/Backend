import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectOrders } from "../../functions/select-orders.ts";
import z from "zod";

export const getOrder:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/orders", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Pedidos"],
            summary: "Listar todos os pedidos",
            description: "retornar os dados dos pedidos, como data e usuario",
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        id_user: z.string(),
                        status: z.string().nullable(),
                        data_pedido: z.date(),
                        valor_total: z.number()
                    })
                )  
            }
        }
    },async (request, reply) => {
        const orders = await selectOrders()
        return reply.status(200).send(orders)
    })
}