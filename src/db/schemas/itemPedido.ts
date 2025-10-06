import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { pedidos } from "./pedidos.ts"
import { produtos } from "./produtos.ts"

export const item_pedido = pgTable('item_pedido', {
    id: uuid().primaryKey().defaultRandom(),
    id_pedido: uuid("id_pedido").notNull()
        .references(() => pedidos.id, { onDelete: "cascade" }),
    id_produto: uuid("id_produto").notNull()
        .references(() => produtos.id, { onDelete: "cascade" }),
    quantidade: integer().default(1)
})