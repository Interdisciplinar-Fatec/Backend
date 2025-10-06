import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";

export const getProduct:FastifyPluginAsyncZod = async (server) => {
    server.get("/products", async (request, reply) => {
        return await db.select({
            id: schema.produtos.id,
            nome: schema.produtos.nome,
            preco: schema.produtos.preco,
            descricao: schema.produtos.descricao,
        }).from(schema.produtos)
    })
}