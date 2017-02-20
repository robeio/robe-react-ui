const JsonServer = require("../server/JsonServer");
const path = require("path");
const portscanner = require('portscanner');
const argv = require('optimist').argv;

const port = 3001;
const fs  = require("fs");
// script.js

function execServer(onStarted) {
    const proc = require("child_process");
    console.log("JSON Server Starting...");
    const child = proc.spawn("node", ["./tools/server/start.js", 3001, "config/data/testdb.json"] , {stdio: "inherit"});
    child.on("close", function (code) {
        process.exit(code);
    });
    console.log("JSON Server Started...");
}

let optsPath = argv.opts ? path.resolve(process.cwd(), argv.opts): path.resolve(process.cwd(), "mocha.json");
const mochaOptions = require(optsPath);

let recursive = null;
function createMochaCommand(options) {
    let command = "";
    for(let key in options) {
        if(options.hasOwnProperty(key)) {
            let option = options[key];
            if(key === "recursive") {
                recursive = option;
                continue;
            }
            switch (Object.prototype.toString.call(option)) {
                case "[object Boolean]":
                    command += "--" + key + " ";
                    break;
                case "[object String]":
                    command += "--" + key + " " + option + " ";
                    break;
                case "[object Array]":
                    command += "--" + key + " " + option.join(" ") + " ";
                    /*
                    for(let i = 0 ; i < option.length; i++) {
                        command += "--" + key + " " + option[i] + " ";
                    }
                    */
                    break;
            }
        }
    }
    return command;
}

let command = createMochaCommand(mochaOptions.opts);

if(argv.coverage) {
    process.env.NODE_ENV = "coverage";
}

if(argv.i || argv.interactive) {
    command = command += "--interactive ";
}

if(argv._ && argv._.length > 0) {
    for(let i = 0 ; i < argv._.length ; i++) {
        command = command +  " --recursive " + mochaOptions.testRootDir + "\/**/*" + argv._[i] + "*";
    }
} else if(recursive) {
    command = command +  " --recursive " + mochaOptions.testRootDir + "/" + recursive;
}

/**
 * function execServer(onStarted) {
    let exec = require('child_process').exec;
    let isStarted = false;
    exec("node ./config/server/start.js 3001", function(error, stdout, stderr) {
        if(error === null && !isStarted) {
            onStarted();
        }
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}
 */

function execMocha() {
    console.log("Mocha Starting");
    const proc = require("child_process");
    console.log(command);

    const args = command.split(" ");
    for(let i = 0 ; i < args.length; i++) {
        if(args[i].trim() === "") {
            args.splice(i, 1);
        }
    }
    const child = proc.spawn("electron-mocha", args, {stdio: "inherit"});
    child.on("close", function (code) {
        process.exit(code);
    });
    console.log("Mocha Started");
}

// Checks the status of a single port
portscanner.checkPortStatus(port, '127.0.0.1', function(error, status) {
    // Status is 'open' if currently in use or 'closed' if available
    if(status === "closed") {
        execServer()
    }
    execMocha();
});
