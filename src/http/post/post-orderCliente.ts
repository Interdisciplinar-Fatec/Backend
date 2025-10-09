import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import { eq } from "drizzle-orm";

export const postOrder:FastifyPluginAsyncZod = async (server) => {
    server.post("/order", {
        schema: {
            body: z.object({
                CPF: z.string(),
                name: z.string().min(3),
                email: z.email(),
                endereço: z.string().min(4),
                data_nascimento: z.string().min(8),
                telefone: z.string(),
            }),
        }
    }, async (request, reply)=> {
        const {
            CPF,
            data_nascimento,
            email,
            endereço,
            name,
            telefone
        } = request.body

        const user = await db.select({id: schema.users.id})
        .from(schema.users)
        .where(eq(schema.users.CPF, CPF))
        if(user.length > 0) {
            const newOrder = await db.insert(schema.pedidos).values({
                data_pedido: new Date(),
                id_cliente: user[0].id
            }).returning()

            return reply.status(201).send({ id_pedido: newOrder[0].id })
        }

        const newUser = await db.insert(schema.users).values({
            name: name,
            CPF: CPF,
            email: email,
            data_nascimento: data_nascimento,
            telefone: telefone,
            senha: data_nascimento,
            endereço: endereço
        }).returning()

        const newOrder = await db.insert(schema.pedidos).values({
            data_pedido: new Date(),
            id_cliente: newUser[0].id
        }).returning()
        
        return reply.status(201).send({
            id_pedido: newOrder[0].id,
            id_usuario: newUser[0].id
        })
    })
}