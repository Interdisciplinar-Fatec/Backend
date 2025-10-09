import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import z from "zod";
import { like } from "drizzle-orm";

export const getProdcutByName:FastifyPluginAsyncZod = async (server) => {
    server.get("/product/:nome", {
        schema: {
            params: z.object({
                nome: z.string()
            })
        }
    },async (request, reply) => {
        const {nome} = request.params

        const nome_normalizado = nome.toLowerCase().trim()

        return await db.select()
        .from(schema.produtos)
        .where(like(schema.produtos.nome_normalizado, `%${nome_normalizado}%`))
    })
}