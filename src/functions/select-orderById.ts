import { eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type orderType } from '../types/orderType.ts'

export const selectOrderById = async (id_pedido:string):Promise<orderType[]> => {
    return await db.select({
        id: schema.pedidos.id,
        id_user: schema.pedidos.id_cliente,
        status: schema.pedidos.status,
        data_pedido: schema.pedidos.data_pedido,
        valor_total: schema.pedidos.valor_total
    }).from(schema.pedidos)
    .where(eq(schema.pedidos.id, id_pedido))
}