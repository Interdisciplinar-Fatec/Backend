import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectProductName } from "../../functions/select-productName.ts";
import { insertProduct } from "../../functions/insert-product.ts";

export const postProduct:FastifyPluginAsyncZod = async (server) => {
    server.post("/admin/product", {
        preHandler:[server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Criação de produtos",
            description: "Cria novos produtos para serem usados nos pedidos",
            body: z.object({
                nome: z.string().min(3),
                preco: z.number(),
                descricao: z.string().default('sem descrição'),
                marca: z.string()
            }),
            response: {
                400: z.object({
                    message: z.string(),
                    id_produto: z.string()
                }),
                200: z.array(
                    z.object({
                        nome: z.string(),
                        nome_normalizado: z.string(),
                        preco: z.number(),
                        descricao: z.string().nullable(),
                        marca: z.string()
                    })
                )
            }
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
        if(p.length > 0 && p[0].marca === marca){
            return reply.status(400).send({message: "Produto já cadastrado!", id_produto: p[0].id})
        }

        const product = await insertProduct({
            nome: nome,
            nome_normalizado: nome_normalizado,
            preco: preco,
            descricao: descricao,
            marca: marca
        })

        return reply.status(200).send(product)
    })
}