import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import { eq } from "drizzle-orm";

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

        await db.update(schema.pedidos)
        .set({status: status})
        .where(eq(schema.pedidos.id, id))

        const order = await db.select().from(schema.pedidos)
        .where(eq(schema.pedidos.id, id))


        return reply.status(200).send(order[0])
    })
}