import { selectAdmin } from "../functions/select-admin.ts";
import bcrypt from "bcryptjs";
import { type adminType } from "../types/adminType.ts";
import { env } from "../lib/env.ts";

export class AuthService {
    private jwt: any;
    constructor(jwt: any) {
        this.jwt = jwt;
    }

    async login(CPF: string, Senha: string){
        const verifyAdmin = await selectAdmin(CPF)
        if (verifyAdmin.length <= 0) { throw new Error("Administrador não encontrado") }

        const admin = verifyAdmin[0]
        const password = await bcrypt.compare(Senha, admin.senha)
        if(!password) { throw new Error("Senha incorreta!")}

        const acesstoken = this.jwt.sign({sub: admin.id}, {expiresIn: "25min"})
        const refreshtoken = this.jwt.sign({sub: admin.id}, {expiresIn: "1d"})

        return {acesstoken, refreshtoken}
    }

    async refreshToken(id: string, token: string){
        const payload = this.jwt.verify(token)
        if(!payload) { throw new Error("Token invalido!")}

        const acesstoken = this.jwt.sign({sub: id}, {expiresIn: "5min"})

        return {acesstoken}
    }
}