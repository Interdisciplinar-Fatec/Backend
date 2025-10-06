import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";

export const getItems:FastifyPluginAsyncZod = async (server) => {
    server.get("/items", async (request, reply) => {
        return await db.select({
            id: schema.item_pedido.id,
            id_pedido: schema.item_pedido.id_pedido,
            id_produto: schema.item_pedido.id_produto,
            quantidade: schema.item_pedido.quantidade
        }).from(schema.item_pedido)
    })
}