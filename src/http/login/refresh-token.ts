import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { AuthService } from "../../service/authenticate-service.ts";

export const refreshToken: FastifyPluginAsyncZod = async (server) => {
    server.post("/refreshToken", {
        schema: {
            body: z.object({
                token: z.string()
            })
        }
    }, async (request, reply) => {
        const {token} = request.body

        const userId = request.user.sub
        const auth = new AuthService(server.jwt)
        const {acesstoken} = await auth.refreshToken(userId ,token)
       
        return reply.send({
            message: 'Login feito com sucesso',
            "token": acesstoken
        })
    })
}