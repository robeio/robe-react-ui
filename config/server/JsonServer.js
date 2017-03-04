const Utility =  require("../util/Utility");
const path = require("path");
const jsonServer = require("robe-json-server");

const  config = {};

config.createJsonServer = (port,routePath, done) => {
    // server.js

    const server = jsonServer.create();
    const router = jsonServer.router(path.join(Utility.projectDir, routePath));
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