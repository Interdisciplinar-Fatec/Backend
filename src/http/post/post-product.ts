import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import { eq } from "drizzle-orm";
import { selectProductName } from "../../functions/select-productName.ts";
import { insertProduct } from "../../functions/insert-product.ts";

export const postProduct:FastifyPluginAsyncZod = async (server) => {
    server.post("/product", {
        preHandler:[server.authenticate],
        schema: {
            body: z.object({
                nome: z.string().min(3),
                preco: z.number(),
                descricao: z.string().default('sem descrição'),
                marca: z.string()
            }),
        }
    }, async (request, reply)=> {
        const {
            nome,
            preco,
            descricao,
            marca
        } = request.body

        const nome_normalizado = nome.toLowerCase().trim()

        const p = await selectProductName(nome_normalizado)
        if(p.length > 0){
            return reply.status(400).send({message: "Produto já cadastrado!"})
        }

        return await insertProduct({
            nome: nome,
            nome_normalizado: nome_normalizado,
            preco: preco,
            descricao: descricao,
            marca: marca
        })
    })
}