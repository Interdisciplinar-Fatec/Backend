import { pgTable, text, timestamp, uuid, varchar, real} from "drizzle-orm/pg-core"
import {users} from "./users.ts"

export const pedidos = pgTable('pedidos', {
    id: uuid().primaryKey().defaultRandom(),
    data_pedido: timestamp().defaultNow().notNull(),
    status: text().default("pendente"),
    valor_total: real().notNull(),
    descricao: text().notNull(),
    id_cliente: uuid("id_cliente").notNull()
    .references(() => users.id, { onDelete: "cascade"} )
})