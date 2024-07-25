import Hapi from '@hapi/hapi'
import { defineMock as defineRoutes } from './routes'

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    })  

    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    const server = getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};