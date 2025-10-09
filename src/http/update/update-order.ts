import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOrderById } from "../../functions/select-orderById.ts";
import { updateOrderStatus } from "../../functions/update-order.ts";

export const updateOrder:FastifyPluginAsyncZod = async (server) => {
    server.patch("/order/:id/:status", {
        schema: {
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