const JsonServer = require("./JsonServer");

const port = process.argv[2];
new JsonServer(port, "config/data/testdb.json").start();
