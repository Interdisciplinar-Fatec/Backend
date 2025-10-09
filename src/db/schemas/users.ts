import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    CPF: text().notNull().unique(),
    name: text().notNull(),
    email: text().notNull().unique(),
    endereco: text().notNull(),
    data_nascimento: text().notNull(),
    telefone: text().notNull(),
    createdAt: timestamp().defaultNow().notNull()
})