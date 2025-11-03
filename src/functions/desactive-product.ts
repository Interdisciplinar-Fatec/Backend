import { eq } from "drizzle-orm"
import { db } from "../db/connection.ts"
import { schema } from "../db/schemas/index.ts"

export const desactiveProduct = async (id: string) => {
    return await db.update(schema.produtos)
    .set({ativo: false})
    .where(eq(schema.produtos.id, id))
}