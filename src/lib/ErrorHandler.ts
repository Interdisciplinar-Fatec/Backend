import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";


export function ErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply){
    console.log("Erro: ", error)

    if(error instanceof ZodError){
        const issues = error.issues.map(iss => ({
            path: iss.path.join(),
            message: iss.message
        }))

        return reply.status(400).send({
            statusCode: 400,
            error: "Bad request",
            message: "Erro de validação",
            issues
        })
    }

    if(error.code && error.message?.includes("violates") || error.code === "230505"){
        return reply.status(500).send({
            statusCode: 500,
            error: "Database Error",
            message: error.message,
            code: error.code
        })
    }

    if(error.statusCode && error.statusCode < 500){
        return reply.status(error.statusCode || 500).send({
            statusCode: error.statusCode,
            error: error.name || "FastifyError",
            message: error.message
        })
    }

    return reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Ocorreu um erro inesperado"
    });
}