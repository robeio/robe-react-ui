const JsonServer = require("./JsonServer");

const port = process.argv[2];
JsonServer.createJsonServer(port, "config/data/testdb.json");
