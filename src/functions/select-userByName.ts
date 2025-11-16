import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { ilike } from "drizzle-orm";
import { type userType } from "../types/userType.ts";

export const selectUserByName = async (name: string): Promise<userType[]> => {
    return await db.select({
        id: schema.users.id,
        name: schema.users.name,
        CPF: schema.users.CPF,
        data_nascimento: schema.users.data_nascimento,
        endereco: schema.users.endereco,
        telefone: schema.users.telefone,
        email: schema.users.email,
        created_at: schema.users.createdAt
    })
    .from(schema.users)
    .where(
        ilike(schema.users.name, `%${name}%`)
    ) 
}