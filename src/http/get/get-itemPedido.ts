import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectItemsOrder } from "../../functions/select-itemsOrder.ts";
import z from "zod";

export const getItems:FastifyPluginAsyncZod = async (server) => {
    server.get("/items/:id_pedido", {
        preHandler: [server.authenticate],
        schema: {
            params: z.object({
                id_pedido: z.string()
            })
        }
    },async (request, reply) => {
        const {id_pedido} = request.params
        return await selectItemsOrder(id_pedido)
    })
}