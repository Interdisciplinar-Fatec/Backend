import { eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type orderItemsType } from "../types/itemsOrderType.ts"

export const selectItemsOrder = async (id_pedido: string): Promise<orderItemsType[]> => {
    return await db.select({
        id: schema.item_pedido.id,
        id_pedido: schema.item_pedido.id_pedido,
        id_produto: schema.item_pedido.id_produto,
        quantidade: schema.item_pedido.quantidade
    }).from(schema.item_pedido)
    .where(eq(schema.item_pedido.id_pedido, id_pedido))
}