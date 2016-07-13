const jsonServer = require("json-server")

const  config = {};

config.createJsonServer = (port,routePath) => {
    // server.js

    const server = jsonServer.create();
    const router = jsonServer.router(routePath);
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    // In this example, returned resources will be wrapped in a body property
    server.use((req, res, next) => {
        res.setHeader("X-Total-Count", 5);
        next();
    })
    server.use(router);

    server.listen(port, () => {
        console.log("JSON Server is running on " + port);
    });
};


module.exports = config;