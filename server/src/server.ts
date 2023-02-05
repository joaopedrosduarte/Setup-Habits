import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRouts } from './routes';

const app = Fastify()

app.register(cors)
app.register(appRouts)

app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(() => {
    console.log("HTTP Server running!")
})