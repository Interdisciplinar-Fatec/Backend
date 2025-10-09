import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { type userType } from "../types/userType.ts";

type CreateUserType = Omit<userType, 'created_at' | 'id'>

export const insertUser = async (params: CreateUserType) => {
    const {name, CPF, email, data_nascimento, telefone, endereco} = params
    return db.insert(schema.users).values({
        name: name,
        CPF: CPF,
        email: email,
        data_nascimento: data_nascimento,
        telefone: telefone,
        endereco: endereco
    }).returning()
}