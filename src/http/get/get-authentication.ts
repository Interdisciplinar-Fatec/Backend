import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const getAuth:FastifyPluginAsyncZod = async (server) => {
    server.get("/auth", {
        preHandler: [server.authenticate],
    },async (request, reply) => {
        const {user} = request;
        
        return reply.status(200).send({
            authenticade: true
        })
    })
}