import {reset, seed} from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schemas/index.ts";


await reset(db, schema);
await seed(db, schema).refine(f => {
    return {
        users: {
            count: 10,
            columns: {
                name: f.fullName(),
                email: f.email(),
                createdAt: f.datetime()
            }
        }
    }
})

await sql.end()

console.log("Database seeded")