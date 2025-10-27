import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUser } from "../../functions/select-user.ts";
import { insertOrder } from "../../functions/insert-order.ts";
import { insertUser } from "../../functions/insert-user.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import dayjs from "dayjs";


export const postOrder:FastifyPluginAsyncZod = async (server) => {
    server.post("/admin/order", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Pedidos"],
            summary: "Criação de pedidos/usuarios",
            description: "Cria um usuario caso ainda não exista e seu pedido",
            body: z.object({
                CPF: z.string(),
                name: z.string().min(3),
                email: z.email(),
                endereco: z.string().min(4),
                data_nascimento: z.string().min(8),
                telefone: z.string(),
                valor_total: z.number(),
                descricao: z.string(),
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
            valor_total,
            descricao,
            items: orderItems
        } = request.body

        const result = await db.transaction(async (tx) => {
            const user = await selectOneUser(CPF)

            if (user.length > 0) {
                const newOrder = await insertOrder(user[0], valor_total, descricao)
                if (newOrder.length <= 0) throw new Error("Erro ao criar pedido")

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
                data_nascimento: dayjs(data_nascimento).format("DD/MM/YYYY"),
                endereco: endereco,
                email: email,
                name: name,
                telefone: telefone
            })

            const newOrder = await insertOrder(newUser[0], valor_total, descricao)
            if(newOrder.length <= 0) throw new Error("Erro ao criar pedido")

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