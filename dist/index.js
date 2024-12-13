"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
(0, server_1.startServer)();
