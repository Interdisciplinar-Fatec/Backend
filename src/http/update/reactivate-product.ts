import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { reactiveProduct } from "../../functions/reactive-product.ts";

export const reactivateProduct: FastifyPluginAsyncZod = async (server) => {
    server.patch("/admin/product/reactivate/:id", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Produtos"],
            summary: "Reativa um produto",
            description: "Reativa um produto no sistema, tornando-o disponível novamente.",
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
        const { id } = request.params

        await reactiveProduct(id)
        return reply.status(200).send({ message: "Producto reativado" })
    })
}
