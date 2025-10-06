import {reset, seed} from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schemas/index.ts";
import { produtos } from "./schemas/produtos.ts";
import { users } from "./schemas/users.ts";


await reset(db, schema);
await seed(db, {users, produtos}).refine(f => {
    return {
        users: {
            count: 10,
            columns: {
                name: f.fullName(),
                email: f.email(),
                CPF: f.uuid(),
                senha: f.lastName(), 
                endereço: f.streetAddress(),
                data_nascimento: f.date(),
                telefone: f.phoneNumber(),
                createdAt: f.datetime()
            }
        },
        produtos: {
            count: 10,
            columns: {
                nome: f.companyName(),
                preco: f.number(),
                descricao: f.string()
            }
        },
    }
})

await sql.end()

console.log("Database seeded")