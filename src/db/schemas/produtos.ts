import { boolean, pgTable, real, text, uuid } from "drizzle-orm/pg-core";

export const produtos = pgTable('produtos', {
    id: uuid().primaryKey().defaultRandom(),
    nome_normalizado: text().notNull(),
    nome: text().notNull(),
    preco: real().notNull(),
    marca: text().notNull(),
    descricao: text(),
    ativo: boolean().notNull().default(true)
})