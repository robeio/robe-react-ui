const fs = require("fs");
const pathLib = require("path");
const Utility = require("./util/Utility");

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = pathLib.normalize(path + "/" + file);
            console.log("delete: ", curPath);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

process.argv.slice(2).forEach(function (val, index, array) {
    deleteFolderRecursive(pathLib.join(Utility.projectDir, val));
});
