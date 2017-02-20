const mime = require('mime');
const multer = require("multer"); // Grabs Multer
const escapeRegexp = require("escape-string-regexp");
const bodyParser = require("body-parser");
const url = require("url");
const fs = require("fs");
const path = require("path");
const colors = require('colors/safe');

function log(msg) {
    console.log(colors.blue(msg));
}
/* eslint-disable prefer-template */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}

/**
 * File {
 *      id: string
 *      lastModified: long
 *      name: "12923379_1598600950465914_2390381053412947001_n.jpg"
 *      size: 120823
 *      type: "image/jpeg"
 * }
 * @param path
 * @return {{destination: string, encoding: null, name: null, mimetype, extension, charsets: *, filename: string, originalname: null, path: *, size: number}}
 */

module.exports = (app, requestPath, tempFolder, fieldName) => {
    const storage = multer.diskStorage({
        destination: tempFolder, // Specifies upload location...
        filename: function (req, file, cb) {
            const id = guid();
            file.id = id;
            fs.writeFileSync(path.normalize(tempFolder + "/" + id + ".json"), JSON.stringify(file), "utf8");
            cb(null, id);
        }
    });
    const upload = multer({ storage: storage });


    app.put(new RegExp(escapeRegexp(requestPath) + ".*"), fieldName ? upload.array(fieldName) : upload.array(), (req, res) => {
        res.status(200).send(req.files); // You can send any response to the user here
    });

    const jsonParser = bodyParser.json({ type: "application/json" });

    const loadFile = (key) => {
        var file = fs.readFileSync(path.normalize(tempFolder + "/" + key + ".json"), "utf8");
        return JSON.parse(file);
    }
    app.post(new RegExp(escapeRegexp(requestPath) + ".*"), jsonParser, (request, response, next) => {
        var data;
        if (Object.prototype.toString.call(request.body) === "[object Array]") {
            data = [];

            for (var i = 0; i < request.body.length; i++) {
                log(" Requested file by " + request.body[i] + " file key");
                data.push(loadFile(request.body[i]));
            }
        } else {
            log(" Requested file by " + request.body.filename + " file key");
            data = loadFile(request.body.filename);
        }
        response.status(200).send(data);
    });

    function deleteFileAndReturnFilename(file) {
        var filePath;
        if (file.path) {
            filePath = file.path;
        } else {
            var fileId = (typeof file === "string") ? file : file.id;
            filePath = tempFolder + "/" + fileId;
        }
        fs.unlinkSync(filePath);
        fs.unlinkSync(filePath + ".json");
        log(filePath + " deleted from disk");
        return file;
    }


    app.delete(new RegExp(escapeRegexp(requestPath) + ".*"), (request, res, next) => {
        var body = "";
        request.on("data", (data) => {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });

        request.on("end", () => {
            let json = JSON.parse(body);
            if (Object.prototype.toString.call(json) === "[object Array]") {
                var files = [];
                for (var i = 0; i < json.length; i++) {
                    files[i] = deleteFileAndReturnFilename(json[i]);
                }
                res.status(200).send(files);
            } else {
                res.status(200).send(deleteFileAndReturnFilename(json));
            }
        });
       // You can send any response to the user here
    });
}
