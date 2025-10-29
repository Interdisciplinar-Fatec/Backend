import { eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import bcrypt from "bcryptjs";
import { env } from "../lib/env.ts";

async function createAdmin() {
    const CPF = env.CPF_ADMIN;
    const senha = env.PASSWORD_ADMIN; 
    const hash = await bcrypt.hash(senha, 10);

    const adminExisting = await db.select().from(schema.admin).where(eq(schema.admin.CPF, CPF));
    if (adminExisting.length > 0) {
        console.log("Admin já existe!");
        return;
    }

    // Cria admin
    await db.insert(schema.admin).values({
        CPF,
        senha: hash
    });
    console.log("Admin criado com sucesso!");
}

createAdmin().then(() => process.exit(0)).catch(console.error);
