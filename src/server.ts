import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import Fastify from "fastify"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { env } from "./lib/env.ts"
import { getUsers } from "./http/get/get-users.ts"
import { getOrder } from "./http/get/get-order.ts"
import { getProduct } from "./http/get/get-product.ts"
import { getItems } from "./http/get/get-itemPedido.ts"
import { getUserByCPF } from "./http/get/get-user.ts"
import { postOrder } from "./http/post/post-orderCliente.ts"
import { updateOrder } from "./http/update/update-order.ts"
import { postProduct } from "./http/post/post-product.ts"
import { getProdcutByName } from "./http/get/get-productByName.ts"


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

server.register(getUsers)
server.register(getUserByCPF)
server.register(getOrder)
server.register(getProduct)
server.register(getItems)
server.register(getProdcutByName)

server.register(postOrder)
server.register(postProduct)

server.register(updateOrder)

server.get("/helth", () => {
    return 'OK';
})



server.listen({port: env.PORT}).then(() => {
    console.log(`HTTP Server is running! port:${env.PORT}`)
})