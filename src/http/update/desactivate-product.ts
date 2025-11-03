import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { desactiveProduct } from "../../functions/desactive-product.ts";

export const desactivateProduct:FastifyPluginAsyncZod = async (server) => {
    server.patch("/admin/product/desactivate/:id", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Desativa um produto",
            description: "Desativa um produto no sistema, tornando-o indisponível para novos cadastros.",
            params: z.object({
                id: z.uuid()
            }),
            response: {
                200: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const {id} = request.params

        await desactiveProduct(id)
        return reply.status(200).send({ message: "Producto desativado"})
    })
}
