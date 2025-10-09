import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { like } from "drizzle-orm";
import { type productType } from "../types/productType.ts";

export const selectProductName = async (nome_normalizado: string):Promise<productType[]> => {
    return await db.select()
    .from(schema.produtos)
    .where(like(schema.produtos.nome_normalizado, `%${nome_normalizado}%`))
}