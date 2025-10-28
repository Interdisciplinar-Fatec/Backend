import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectItemsOrder } from "../../functions/select-itemsOrder.ts";
import z from "zod";

export const getItems:FastifyPluginAsyncZod = async (server) => {
    server.get("/admin/items/:id_pedido", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Items"],
            summary: "Listar os items de um pedido",
            description: "retornar o Id do pedido e seus respectivos produtos",
            params: z.object({
                id_pedido: z.string()
            }),
            response: {
              200: z.array(
                  z.object({
                      id: z.string(),
                      id_pedido: z.string(),
                      id_produto: z.string(),
                      quantidade: z.number().nullable()
                  })
              )
            }
        }
    },async (request, reply) => {
        const {id_pedido} = request.params
        const items = await selectItemsOrder(id_pedido)
        return reply.status(200).send(items)
    })
}