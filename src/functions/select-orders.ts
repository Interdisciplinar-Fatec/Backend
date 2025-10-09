import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type orderType } from '../types/orderType.ts'

export const selectOrders = async ():Promise<orderType[]> => {
    return await db.select({
        id: schema.pedidos.id,
        status: schema.pedidos.status,
        data_pedido: schema.pedidos.data_pedido
    }).from(schema.pedidos)
}