import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { selectOrderId } from "../../functions/select-orderId.ts";
import { type OrdersClient } from "../../types/orderClient.ts";
import { selectOneUserId } from "../../functions/select-userId.ts";
import z from "zod";

export const getOrderCPF: FastifyPluginAsyncZod = async (server) => {
    server.get("/order/:userId", {
        schema: {
            tags: ["User", "Pedidos"],
            summary: "Listar pedidos e produtos de um cliente",
            description: "Retorna os dados de um cliente, seus pedidos e os produtos de cada pedido, com base no CPF informado.",
            params: z.object({
                userId: z.string()
            }), 
            response: {
                404: z.object({
                    message: z.string()
                }),
                401: z.object({
                    message: z.string()
                }),
                200: z.object({
                    user: z.object({
                        id: z.string(),
                        name: z.string(),
                        CPF: z.string(),
                        data_nascimento: z.string(),
                        endereco: z.string(),
                        telefone: z.string(),
                        email: z.string(),
                        createdAt: z.date()
                    }),
                    pedidos: z.array(
                        z.object({
                            PedidoId: z.string(),
                            DataPedido: z.date(),
                            Status: z.string().nullable(),
                            ValorPedido: z.number(),
                            descricaoPedido:z.string(),
                            Produtos: z.array(
                                z.object({
                                    ProdutoId: z.string(),
                                    Nome: z.string().nullable(),
                                    Quantidade: z.number().nullable(),
                                    Preco: z.number().nullable(),
                                    ProdutoDescricao: z.string().nullable()
                                })
                            )
                        })
                    )
                })
            }
        }
    }, async (request, reply) => {
        const userIdCookie = request.cookies.userId;
        const {userId: userIdStorage} = request.params;

        if (userIdCookie) {
            const user = await selectOneUserId(userIdCookie)
            if (user.length <= 0) {

                return reply.status(404).send({ message: "Usuario não encontrado" })
            }

            const orders: OrdersClient = await selectOrderId(user[0].id)
            return reply.status(200).send(orders)
        }

        if (userIdStorage) {
            const user = await selectOneUserId(userIdStorage)
            if (user.length <= 0) {

                return reply.status(404).send({ message: "Usuario não encontrado" })
            }

            const orders: OrdersClient = await selectOrderId(user[0].id)
            return reply.status(200).send(orders)
        }

        return reply.status(401).send({ message: "Usuário não autenticado" });
    })
}