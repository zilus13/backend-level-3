import Hapi from '@hapi/hapi';

// Define el tipo de un Item con tres propiedades: id, name y price.
type Item = {
    id: number; // Identificador único del item
    name: string; // Nombre del item
    price: number; // Precio del item
};

// Array en memoria para almacenar los items
let items: Item[] = [];
// Contador para generar IDs únicos para los nuevos items
let currentId = 1;

/**
 * Define las rutas para el servidor Hapi
 * @param server - Instancia del servidor Hapi
 */
export const defineRoutes = (server: Hapi.Server) => {
    // Ruta para verificar que el servidor está funcionando
    server.route({
        method: 'GET',
        path: '/ping',
        handler: () => {
            return { ok: true }; // Respuesta de estado
        },
    });

    // Ruta para obtener la lista de todos los items
    server.route({
        method: 'GET',
        path: '/items',
        handler: () => {
            return items; // Devuelve el array de items
        },
    });

    // Ruta para crear un nuevo item
    server.route({
        method: 'POST',
        path: '/items',
        handler: (request, h) => {
            // Extrae los datos del payload
            const { name, price } = request.payload as Partial<Item>;

            // Valida que el precio esté presente
            if (price === undefined) {
                return h
                    .response({
                        errors: [{ field: 'price', message: 'Field "price" is required' }],
                    })
                    .code(400); // Código de error por campo requerido
            }

            // Valida que el precio no sea negativo
            if (price < 0) {
                return h
                    .response({
                        errors: [{ field: 'price', message: 'Field "price" cannot be negative' }],
                    })
                    .code(400); // Código de error por valor inválido
            }

            // Crea un nuevo item y lo agrega al array
            const newItem: Item = { id: currentId++, name: name!, price: price! };
            items.push(newItem);

            // Responde con el item creado
            return h.response(newItem).code(201); // Código 201: Creado
        },
    });

    // Ruta para obtener un item por su ID
    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: (request, h) => {
            // Extrae el ID de los parámetros
            const { id } = request.params;
            const item = items.find((i) => i.id === Number(id)); // Busca el item por ID

            // Si no se encuentra, responde con 404
            if (!item) {
                return h.response().code(404); // Código 404: No encontrado
            }

            // Devuelve el item encontrado
            return item;
        },
    });

    // Ruta para actualizar un item por su ID
    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: (request, h) => {
            // Extrae el ID de los parámetros y el payload
            const { id } = request.params;
            const { name, price } = request.payload as Partial<Item>;

            // Valida que el precio no sea negativo
            if (price !== undefined && price < 0) {
                return h
                    .response({
                        errors: [{ field: 'price', message: 'Field "price" cannot be negative' }],
                    })
                    .code(400); // Código de error por valor inválido
            }

            // Busca el índice del item por su ID
            const itemIndex = items.findIndex((i) => i.id === Number(id));
            if (itemIndex === -1) {
                return h.response().code(404); // Código 404: No encontrado
            }

            // Actualiza las propiedades del item
            items[itemIndex] = {
                ...items[itemIndex],
                name: name || items[itemIndex].name,
                price: price || items[itemIndex].price,
            };

            // Devuelve el item actualizado
            return items[itemIndex];
        },
    });

    // Ruta para eliminar un item por su ID
    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: (request, h) => {
            // Extrae el ID de los parámetros
            const { id } = request.params;

            // Busca el índice del item por su ID
            const itemIndex = items.findIndex((i) => i.id === Number(id));
            if (itemIndex === -1) {
                return h.response().code(404); // Código 404: No encontrado
            }

            // Elimina el item del array
            items.splice(itemIndex, 1);

            // Responde con un código 204 (sin contenido)
            return h.response().code(204);
        },
    });
};
