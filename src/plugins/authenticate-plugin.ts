import jwt from "@fastify/jwt";
import type { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { env } from "../lib/env.ts";

export default fp(async (server: FastifyInstance)=> {
    server.register(jwt, {
        secret: env.JWT_KEY
    })

    server.decorate('authenticate', async (request: FastifyRequest, reply:FastifyReply)=> {
        try {
      
            const token = request.cookies.refreshToken;

            if (!token) {
                return reply.status(401).send({ message: "Token ausente" });
            }

            const decoded = server.jwt.verify(token) as {sub: string};
            request.user = {sub: decoded.sub};

        } catch (error) {
            return reply.status(500).send({erro: error})
        }
    })
})