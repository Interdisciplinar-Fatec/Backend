import { eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import {type productType } from "../types/productType.ts";

export const selectProductsDesactivated = async ():Promise<productType[]> => {
    return await db.select({
        id: schema.produtos.id,
        nome: schema.produtos.nome,
        preco: schema.produtos.preco,
        descricao: schema.produtos.descricao,
        marca: schema.produtos.marca
    }).from(schema.produtos)
    .where(eq(schema.produtos.ativo, false))
}