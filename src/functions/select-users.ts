import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type userBasicType } from "../types/userBasicType.ts";

export const selectUsers = async (): Promise<userBasicType[]> => {
    return await db.select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        CPF: schema.users.CPF,
        crated_at: schema.users.createdAt
    }).from(schema.users)
}