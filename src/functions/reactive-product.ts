import { and, eq } from "drizzle-orm"
import { db } from "../db/connection.ts"
import { schema } from "../db/schemas/index.ts"

export const reactiveProduct = async (id: string) => {
    return await db.update(schema.produtos)
    .set({ativo: true})
    .where(and(
        eq(schema.produtos.ativo, false),
        eq(schema.produtos.id, id),
    ))
}