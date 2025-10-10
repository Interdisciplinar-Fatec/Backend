import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { eq } from "drizzle-orm";
import { type adminType } from "../types/adminType.ts";

export const selectAdmin = async (CPF: string): Promise<adminType[]> => {
    return await db.select({
        id: schema.admin.id,
        CPF: schema.admin.CPF,
        senha: schema.admin.senha,
    })
    .from(schema.admin)
    .where(eq(schema.admin.CPF, CPF)) 
}