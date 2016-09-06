const jsonServer = require("json-server");
const path = require("path");
const multerImpl = require("./MultierImpl");
const appRoot = require("app-root-path");

function fixPath(absolutePath) {
    if (!absolutePath.startsWith("/")) {
        if (!absolutePath.startsWith("../")) {
            absolutePath = "../" + absolutePath;
        }
        absolutePath = path.join(__dirname, absolutePath);
    }
    return absolutePath;
}

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

function getAppHome() {
    return appRoot.path;
}

function Server(port, appPath) {
    const server = jsonServer.create();
    server.use(jsonServer.defaults());
    const routes = [];

    this.route = (routePath) => {
        routes.push(jsonServer.router(fixPath(routePath)));
        return this;
    };

    this.upload = (requestPath, tempFolder, fieldName) => {
        tempFolder = fixPath(tempFolder);
        multerImpl(server, requestPath, tempFolder, fieldName);
        return this;
    };


    this.start = () => {
        if (appPath) {
            server.get(appPath, (req, res) => {
                res.status(200).json({
                    userPath: getUserHome(),
                    applicationPath: getAppHome()
                });
            });
        }

        var key;
        for (key in routes) {
            server.use(routes[key]);
        }
        /* eslint-disable prefer-template */
        server.listen(port, () => {
            console.log("Server is running on " + port + " port");
        });
    };
}

module.exports = Server;