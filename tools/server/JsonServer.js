const jsonServer = require("robe-json-server");
const path = require("path");
const multerImpl = require("./MultierImpl");
const Utility = require("../util/Utility");
const projectDir = Utility.projectDir;

function Server(port, appPath) {
    this.projectDir = projectDir;
    const server = jsonServer.create();
    server.use(jsonServer.defaults());
    const routes = [];

    this.route = (routePath) => {
        routes.push(jsonServer.router(path.resolve(projectDir, routePath)));
        return this;
    };

    this.upload = (requestPath, tempFolder, fieldName) => {
        tempFolder = path.resolve(projectDir, tempFolder);
        multerImpl(server, requestPath, tempFolder, fieldName);
        return this;
    };


    this.start = (callback) => {
        if (appPath) {
            server.get(appPath, (req, res) => {
                res.status(200).json({
                    userPath: process.env.HOME || process.env.USERPROFILE,
                    applicationPath: projectDir
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
            if(callback) {
                callback();
            }
        });
    };
}

module.exports = Server;