import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import z from "zod";
import { eq } from "drizzle-orm";

export const getUserByCPF:FastifyPluginAsyncZod = async (server) => {
    server.get("/users/:CPF", {
        schema: {
            params: z.object({
                CPF: z.string()
            })
        }
    },async (request, reply) => {
        const { CPF } = request.params;

        return await db.select({
            id: schema.users.id,
            name: schema.users.name,
            CPF: schema.users.CPF,
            data_nascimento: schema.users.data_nascimento,
            endereco: schema.users.endereço,
            telefone: schema.users.telefone,
            email: schema.users.email,
        })
        .from(schema.users)
        .where(eq(schema.users.CPF, CPF)) //sql`${schema.user.cpf} = ${CPF}`
    })
}