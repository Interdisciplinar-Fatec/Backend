import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type userType } from "../types/userType.ts";

type CreatedUserType = Omit<userType, 'created_at' >
export const insertOrder = async (user:CreatedUserType) => {
    return db.insert(schema.pedidos).values({
        data_pedido: new Date(),
        id_cliente: user.id
    }).returning()
}