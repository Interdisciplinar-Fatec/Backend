import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import Fastify from "fastify"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { env } from "./lib/env.ts"
import { getUser } from "./http/get-user.ts"
import { getOrder } from "./http/get-order.ts"
import { getProduct } from "./http/get-product.ts"
import { getItems } from "./http/get-itemPedido.ts"


const server = Fastify().withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifyCors, {
    origin: "*",
})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Documentação",
            version: "0.0.1",
            description: "Documentação da API"
        },
    },
    transform: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

server.register(getUser)
server.register(getOrder)
server.register(getProduct)
server.register(getItems)

server.get("/helth", () => {
    return 'OK';
})



server.listen({port: env.PORT}).then(() => {
    console.log(`HTTP Server is running! port:${env.PORT}`)
})