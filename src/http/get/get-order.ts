import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";

export const getOrder:FastifyPluginAsyncZod = async (server) => {
    server.get("/orders", async (request, reply) => {
        return await db.select({
            id: schema.pedidos.id,
            status: schema.pedidos.status,
            data_pedido: schema.pedidos.data_pedido
        }).from(schema.pedidos)
    })
}