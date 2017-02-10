const path = require("path");
var fs = require('fs');
const Utility = require("./Utility");
path.resolve(Utility.projectDir);


function addKeysToDependencyAsSet(object, dependencies) {
    if(object) {
        for(let key in object) {
            if(object.hasOwnProperty(key)) {
                if(dependencies.indexOf(key) === -1) {
                    dependencies.push(key);
                }
            }
        }
    }
}

function addKeysToDependency(object, dependencies) {
    if(object) {
        for(let key in object) {
            if(object.hasOwnProperty(key)) {
                dependencies.push(key);
            }
        }
    }
}
const node_modules = path.resolve(Utility.projectDir, "node_modules");

function getModuleDependencies(packagePath, dependencies) {
    let result = [];
    try {
        var packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        let deps = [];
        addKeysToDependency(packageJson.dependencies, deps);
        addKeysToDependencyAsSet(packageJson.peerDependencies, deps);
        for(let i = 0 ; i < deps.length; i++) {
            if(node_modules[].indexOf(deps[i]) === -1) {
                dependencies.push(deps[i]);
                result.push(deps[i]);
            }
        }
    }catch (e) {
        console.log(e);
    }
    return result;
}

function getDependencies(paths) {
    let dependencies = {};
    let basePath = Utility.projectDir;
    do {
        let packages = [];
        for(let i = 0 ; i < paths.length; i++) {
            let packagePath = path.resolve(basePath, paths[i], "package.json");

            let foundPackages = getModuleDependencies(
                packagePath,
                dependencies
            );
           if(foundPackages.length > 0) {
               packages = packages.concat(foundPackages);
           }
        }
        basePath = node_modules;
        paths = packages;
    }while (paths.length > 0);
    return dependencies;
}

module.exports =  {
    getDependencies
};