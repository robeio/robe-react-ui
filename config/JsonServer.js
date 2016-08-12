const jsonServer = require("json-server");
const path = require("path");
const multerImpl = require("./MultierImpl");

function fixPath(absolutePath) {
    if (!absolutePath.startsWith("/")) {
        if (!absolutePath.startsWith("../")) {
            absolutePath = "../" + absolutePath;
        }
        absolutePath = path.join(__dirname, absolutePath);
    }
    return absolutePath;
}
function Server(port) {
    this.__port = port;
    const server = jsonServer.create();
    server.use(jsonServer.defaults());
    const routes = [];

    this.route = (routePath) => {
        routes.push(jsonServer.router(fixPath(routePath)));
        return this;
    };

    this.upload = (requestPath, tempFolder) => {
        tempFolder = fixPath(tempFolder);
        multerImpl(server, requestPath, tempFolder);
        return this;
    }

    this.start = () => {
        for (var key in routes) {
            server.use(routes[key]);
        }
        /* eslint-disable prefer-template */
        server.listen(this.__port, () => {
            console.log("Server is running on " + this.__port + " port");
        });
    };
}

module.exports = Server;