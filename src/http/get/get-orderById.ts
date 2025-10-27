import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectOrderId } from "../../functions/select-orderId.ts";
import { type OrdersClient } from "../../types/orderClient.ts";
import { selectOneUserId } from "../../functions/select-userId.ts";
import z from "zod";

export const getOrderId: FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/order/:id", {
        schema: {
            tags: ["Admin", "Pedidos"],
            summary: "Listar pedidos e produtos de um cliente",
            description: "Retorna os dados de um cliente, seus pedidos e os produtos de cada pedido, com base no CPF informado.",
            params: z.object({
                id: z.string()
            })
        }
    }, async (request, reply) => {
        const { id } = request.params;

        const user = await selectOneUserId(id)
        if (user.length <= 0) {
            throw new Error("Usuario não encontrado")
        }

        const orders: OrdersClient = await selectOrderId(user[0].id)
        return reply.status(200).send(orders)
    })
}