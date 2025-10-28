import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { AuthService } from "../../service/authenticate-service.ts";

export const LoginAdmin: FastifyPluginAsyncZod = async (server) => {
    server.post("/login", {
        schema: {
            tags: ["Admin", "Login"],
            summary: "Login administrativo",
            description: "Validar os dados e criar o token de acesso",
            body: z.object({
                CPF: z.string(),
                Senha: z.string().min(6)
            }),
             response: {
                200: z.object({
                    message: z.string(),
                    token: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const {CPF, Senha} = request.body

        const auth = new AuthService(server.jwt)
        const {acesstoken, refreshtoken} = await auth.login(CPF, Senha)
       
        reply.setCookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60* 24 * 7
        })

        return reply.status(200).send({
            message: 'Login feito com sucesso',
            "token": refreshtoken
        })
    })
}