"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoutes = void 0;
const defineRoutes = (server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            };
        }
    });
};
exports.defineRoutes = defineRoutes;
