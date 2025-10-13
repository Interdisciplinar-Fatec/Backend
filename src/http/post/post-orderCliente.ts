import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUser } from "../../functions/select-user.ts";
import { insertOrder } from "../../functions/insert-order.ts";
import { insertUser } from "../../functions/insert-user.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";

export const postOrder:FastifyPluginAsyncZod = async (server) => {
    server.post("/order", {
        preHandler: [server.authenticate],
        schema: {
            body: z.object({
                CPF: z.string(),
                name: z.string().min(3),
                email: z.email(),
                endereco: z.string().min(4),
                data_nascimento: z.string().min(8),
                telefone: z.string(),
                items: z.array(z.object({
                    id_produto: z.uuid(),
                    quantidade: z.number().optional()
                }))
            }),
        }
    }, async (request, reply)=> {
        const {
            CPF,
            data_nascimento,
            email,
            endereco,
            name,
            telefone,
            items: orderItems
        } = request.body

        const result = await db.transaction(async (tx) => {
            const user = await selectOneUser(CPF)

            if (user.length > 0) {
                const newOrder = await insertOrder(user[0])

                await tx.insert(schema.item_pedido)
                .values(
                    orderItems.map(item => ({
                        id_pedido: newOrder[0].id,
                        id_produto: item.id_produto,
                        quantidade: item.quantidade
                    }))
                )

                return {
                    id_pedido: newOrder[0].id
                } 
            }

            const newUser = await insertUser({
                CPF: CPF,
                data_nascimento: data_nascimento,
                endereco: endereco,
                email: email,
                name: name,
                telefone: telefone
            })

            const newOrder = await insertOrder(newUser[0])

            await tx.insert(schema.item_pedido)
            .values(
                orderItems.map(item => ({
                    id_pedido: newOrder[0].id,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade
                }))
            )

            return {
                id_pedido: newOrder[0].id,
                id_user: newUser[0].id
            }
        })
       
        return reply.status(201).send(result)
    })
}