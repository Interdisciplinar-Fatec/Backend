import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUser } from "../../functions/select-user.ts";
import { env } from "../../lib/env.ts";

export const getUserId:FastifyPluginAsyncZod = async (server) => {
    server.get("/user/:CPF", {
        schema: {
            tags: ["Cliente"],
            summary: "Buscar um usuario no banco",
            description: "retornar o id dele",
            params: z.object({
                CPF: z.string()
            }),
            response: {
                201: z.object({
                    userId: z.string()
                }),
                200: z.object({
                    adminCPF: z.boolean()
                })
            
            }
        }
    },async (request, reply) => {
        const { CPF } = request.params;

        if(CPF === env.CPF_ADMIN) {
            return reply.status(200).send({
                adminCPF: true
            })
        }
        
        const user = await selectOneUser(CPF)
        if(user.length <= 0) throw new Error("Usuario não encontrado") 
    
        reply.setCookie("userId", user[0].id, {
            httpOnly: true,
            sameSite: true,
            path: "/",
            maxAge: 60 * 60 * 3
        })

        return reply.status(201).send({ userId: user[0].id })
    })
}