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
    this.__server = jsonServer.create();
    this.__server.use(jsonServer.defaults());

    this.route = (routePath) => {
        this.__server.use(jsonServer.router(fixPath(routePath)));
        return this;
    };

    this.upload = (requestPath, tempFolder) => {
        tempFolder = fixPath(tempFolder);
        multerImpl(this.__server, requestPath, tempFolder);
        return this;
    }

    this.start = () => {
        /* eslint-disable prefer-template */
        this.__server.listen(this.__port, () => {
            console.log("Server is running on " + this.__port + " port");
        });
    };
}

module.exports = Server;