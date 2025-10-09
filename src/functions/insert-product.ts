import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import {type  productType } from "../types/productType.ts";

type CreateProductType = Omit<productType, 'id'> & {
    nome_normalizado:string
}

export const insertProduct = async (params: CreateProductType) => {
    const {nome, nome_normalizado, descricao, marca, preco} = params
    return await db.insert(schema.produtos).values({
        nome: nome,
        nome_normalizado: nome_normalizado,
        descricao: descricao,
        marca: marca,
        preco: preco
    }).returning()
}