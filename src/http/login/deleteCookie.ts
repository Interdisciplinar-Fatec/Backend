import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const LogoutUser: FastifyPluginAsyncZod = async (server) => {
    server.post("/user/logout", {
        schema: {
            tags: ["User", "Login"],
            summary: "Log-out cliente",
            description: "Apagar o cookie de acesso",
            response: {
                200: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {

        reply.setCookie("userId", "", {
            httpOnly: true,
            sameSite: true,
            path: "/",
            maxAge: 0,
        })

        return reply.status(200).send({
            message: 'Logout feito com sucesso'
        })
    })
}