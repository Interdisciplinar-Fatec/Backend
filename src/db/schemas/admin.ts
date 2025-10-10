import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const admin = pgTable('admin', {
    id: uuid().primaryKey().defaultRandom(),
    CPF: text().notNull().unique(),
    senha: text().notNull()
})