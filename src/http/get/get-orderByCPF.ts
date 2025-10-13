import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOrderCPF } from "../../functions/select-orderCPF.ts";
import {type  OrdersClient } from "../../types/orderClient.ts";

export const getOrderCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/order/:CPF", {
        schema: {
            tags: ["Pedidos"],
            summary: "Listar pedidos e produtos de um cliente",
            description: "Retorna os dados de um cliente, seus pedidos e os produtos de cada pedido, com base no CPF informado.",
            params: z.object({
                CPF: z.string()
            })
        }
    }, async (request, reply)=> {
        const {CPF} = request.params

        const orders:OrdersClient =  await selectOrderCPF(CPF)
        return reply.status(200).send(orders)
    })
}