import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';

/**
 * Crea una instancia del servidor Hapi y configura sus opciones básicas.
 * @returns {Hapi.Server} Una nueva instancia del servidor Hapi.
 */
export const getServer = (): Hapi.Server => {
    const server = Hapi.server({
        host: 'localhost', // Dirección donde se ejecutará el servidor
        port: 3000,        // Puerto donde el servidor estará disponible
    });

    defineRoutes(server); // Define las rutas para el servidor

    return server; // Retorna la instancia del servidor
};

/**
 * Inicializa el servidor sin arrancarlo.
 * @returns {Promise<Hapi.Server>} Promesa que resuelve con la instancia del servidor inicializado.
 */
export const initializeServer = async (): Promise<Hapi.Server> => {
    const server = getServer();
    await server.initialize(); // Inicializa el servidor sin empezar a escuchar peticiones
    return server;
};

/**
 * Arranca el servidor Hapi y lo pone a escuchar peticiones.
 * @returns {Promise<Hapi.Server>} Promesa que resuelve con la instancia del servidor en ejecución.
 */
export const startServer = async (): Promise<Hapi.Server> => {
    const server = getServer();
    await server.start(); // Arranca el servidor y empieza a escuchar peticiones
    console.log(`Server running on ${server.info.uri}`); // Muestra un mensaje con la URI del servidor
    return server;
};
