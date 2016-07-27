const path = require("path");
const jsonServer = require("json-server");
const config = {};
const multerImpl = require("./MultierImpl");

/*
const fileSaver = (tempFolder) => {
    const storage = multer.diskStorage({
        destination: tempFolder, // Specifies upload location...
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    return multer({ storage: storage });
}
*/

config.createJsonServer = (port, routePath, uploadContextPath, tempFolder) => {
    // server.js

    const server = jsonServer.create();
    const router = jsonServer.router(routePath);
    const middlewares = jsonServer.defaults();

    if (!tempFolder) {
        tempFolder = "temp";
    }

    tempFolder = path.join(__dirname, tempFolder);
    // const upload = fileSaver(tempFolder);
    //  server.post(tempRequestPath, (req, res) => {
    //     res.send({ responseText: req.file.path });
    // });
    /*
     const upload = fileSaver(tempFolder);
    server.post("/files", upload.any(), (req, res) => {
        console.log("Example file completed...");
        res.sendStatus(200);
    });

*/
    server.use(middlewares);
    /*
    // In this example, returned resources will be wrapped in a body property
    server.use((req, res, next) => {
        res.setHeader("X-Total-Count", 5);

        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request methods you wish to allow
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

        // Request headers you wish to allow
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

        // Pass to next layer of middleware
        next();
    })
    */
    multerImpl(server, uploadContextPath, tempFolder);
    server.use(router);
    /* eslint-disable prefer-template */
    server.listen(port, () => {
        console.log("JSON Server is running on " + port);
    });
};

module.exports = config;
