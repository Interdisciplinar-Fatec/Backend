import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { selectOneUser } from "../../functions/select-user.ts";

export const getUserByCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/users/:CPF", {
        schema: {
            params: z.object({
                CPF: z.string()
            })
        }
    },async (request, reply) => {
        const { CPF } = request.params;

        return await selectOneUser(CPF)
    })
}