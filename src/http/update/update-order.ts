import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOrderById } from "../../functions/select-orderById.ts";
import { updateOrderStatus } from "../../functions/update-order.ts";

export const updateOrder:FastifyPluginAsyncZod = async (server) => {
    server.patch("/order/:id/:status", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Pedidos"],
            summary: "Atualiza o status de um pedido",
            description: "Espera receber uma string com o nome do novo status",
            params: z.object({
               id: z.uuid(),
               status: z.string().min(3)
            }),
        }
    }, async (request, reply)=> {
        const { id, status } = request.params

        await updateOrderStatus(status, id)

        const order = await selectOrderById(id)
        return reply.status(200).send(order[0])
    })
}