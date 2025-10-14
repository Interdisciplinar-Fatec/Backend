import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOrderCPF } from "../../functions/select-orderCPF.ts";
import {type  OrdersClient } from "../../types/orderClient.ts";
import { selectOneUserId } from "../../functions/select-userId.ts";

export const getOrderCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/order", {
        schema: {
            tags: ["Pedidos"],
            summary: "Listar pedidos e produtos de um cliente",
            description: "Retorna os dados de um cliente, seus pedidos e os produtos de cada pedido, com base no CPF informado.",
        }
    }, async (request, reply)=> {
        const userId = request.cookies.userId;

        if (!userId) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const user = await selectOneUserId(userId.trim())
        if(user.length <= 0) {
            throw new Error("Usuario não encontrado")
        }

        const orders =  await selectOrderCPF(user[0].id)
        return reply.status(200).send(orders)
    })
}