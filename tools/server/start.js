const JsonServer = require("./JsonServer");


const port = process.argv.length > 1 ? process.argv[2]: 3001;
const files = process.argv.length > 2 ? process.argv[3]: "config/data/testdb.json";
const portscanner = require('portscanner');
// Checks the status of a single port
portscanner.checkPortStatus(port, '127.0.0.1', function(error, status) {
    // Status is 'open' if currently in use or 'closed' if available
    if(status === "closed") {
        const jsonServer = new JsonServer(port, "/application");
        jsonServer.route(files).upload("/files", "config/data/upload", "files").start();
    }
});
