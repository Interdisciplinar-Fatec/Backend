import { pgTable, real, text, uuid } from "drizzle-orm/pg-core";

export const produtos = pgTable('produtos', {
    id: uuid().primaryKey().defaultRandom(),
    nome: text().notNull(),
    preco: real().notNull(),
    descricao: text(),
})