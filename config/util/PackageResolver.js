var fs = require("fs");
var path = require("path");

function getPackage(projectPath) {
    const packagePath = path.resolve(projectPath, "packageJson");
    if(!fs.existsSync(packagePath)) {
        return false;
    }
    return JSON.parse(fs.readFileSync(packagePath, "utf8"));
}

function addAllIfAbsent(src, dest) {
    for(let key in src) {
        if(src.hasOwnProperty(key)) {

        }
    }
}

function getDependencies(projectPath, ...keys, dependencies) {
    var packageJson = getPackage(projectPath);
    for(var i = 0; i < keys.length; i++ ) {
        var deps = packageJson[keys[i]];
        if(dependencies[]);
    }
}

module.exports = {
    getPackage,
    getDependencies
};