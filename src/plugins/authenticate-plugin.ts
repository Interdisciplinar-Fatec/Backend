import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import type { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { env } from "../lib/env.ts";

export default fp(async (server: FastifyInstance)=> {
    server.register(cookie)
    server.register(jwt, {
        secret: env.JWT_KEY
    })

    server.decorate('authenticate', async (request: FastifyRequest, reply:FastifyReply)=> {
        try {
            await request.jwtVerify()
        } catch (error) {
            return reply.status(500).send({erro: error})
        }
    })
})