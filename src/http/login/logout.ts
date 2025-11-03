import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const LogoutAdmin: FastifyPluginAsyncZod = async (server) => {
    server.post("/admin/logout", {
        preHandler: [server.authenticate],
        schema: {
            tags: ["Admin", "Login"],
            summary: "Logout administrativo",
            description: "Deslogar e remover o token de acesso",
             response: {
                200: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {

        reply.setCookie("refreshToken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 0,
        })

        return reply.status(200).send({message: 'Logout feito com sucesso'})
    })
}