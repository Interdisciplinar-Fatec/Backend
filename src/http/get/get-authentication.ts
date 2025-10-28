import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod"

export const getAuth:FastifyPluginAsyncZod = async (server) => {
    server.get("/auth", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Login"],
            summary: "Rota de validação",
            description: "Rota usada pelo frontend para verificar se o usuario está autenticado!",
            response: {
                200: z.object({
                    authenticate: z.boolean()
                })
            }
            
        }
    },async (request, reply) => {
        const {user} = request;
        
        return reply.status(200).send({
            authenticate: true
        })
    })
}