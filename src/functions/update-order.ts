import { eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type orderItemsType } from "../types/itemsOrderType.ts";


export const updateOrderStatus = async (status: string, id_pedido:string): Promise<orderItemsType[]> => {
    return await db.update(schema.pedidos)
    .set({ status: status })
    .where(eq(schema.pedidos.id, id_pedido))
}