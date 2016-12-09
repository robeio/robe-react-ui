var fs = require("fs");
var path = require("path")
var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
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
    deleteFolderRecursive(path.resolve(val));
});
