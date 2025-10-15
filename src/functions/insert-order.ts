import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type userType } from "../types/userType.ts";

type CreatedUserType = Omit<userType, 'created_at' >
export const insertOrder = async (user:CreatedUserType, valor_total: number, descricao: string) => {
    return db.insert(schema.pedidos).values({
        data_pedido: new Date(),
        valor_total: valor_total,
        descricao: descricao,
        id_cliente: user.id
    }).returning()
}