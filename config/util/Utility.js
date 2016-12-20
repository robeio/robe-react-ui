var appRoot = require("app-root-path");
var hasOwnProperty = Object.prototype.hasOwnProperty;

var Utility = function Utility() {
    this.projectDir = appRoot.path;
    /**
     * Checks given value type is Number, Boolean, Array, String, Date, RegExp, Null, Function, Undefined
     * @param obj
     * @param error
     * @returns {boolean}
     */
    function isKnownType(obj, error) {
        switch (toString.call(obj)) {
            case "[object Number]":
            case "[object Boolean]":
            case "[object Array]":
            case "[object String]":
            case "[object Date]":
            case "[object RegExp]":
            case "[object Null]":
            case "[object Function]":
            case "[object Undefined]":
                return true;
            default :
                if (error) {
                    throw new Error("Given object is unknown ! Object:  " + obj);
                }
                return false;

        }
    }
    this.isKnownType = isKnownType.bind(this);


    /**
     * @param {Object} src
     * @param {Object} dest
     * @return {Object}
     */
    this.mergeDeep = function(src, dest) {
        for (var key in src) {
            if (hasOwnProperty.call(src, key)) {
                var destValue = dest[key];
                var sourceValue = src[key];
                if (this.isKnownType(destValue) || this.isKnownType(sourceValue)) {
                    dest[key] = src[key];
                } else {
                    dest[key] = this.mergeDeep(src[key], dest[key]);
                }
            }
        }
        return dest;
    };


    /**
     * @param {Array} src
     * @return {any} element
     */
    this.addElementToArray = function(array, element) {
        if (element) {
            if (!array) {
                array = [];
            }
            if (array.indexOf(element) === -1) {
                array.push(element);
            }
        }
        return array;
    };


    /**
     * @param {Array} src
     * @return {any} element
     */
    this.removeElementFromArray = function(array, element) {
        if (element) {
            if (!array) {
                array = [];
            }
            var index = array.indexOf(element);
            if (index === -1) {
                array.splice(index, 1);
            }
        }
        return array;
    }

    this.deleteElementInArrayByKeyMap = function(key, array, keyMap) {
        if (keyMap[key]) {
            array.splice(keyMap[key], 1);
            delete keyMap[key];
        }
    };

    this.upsertElementInArrayByKeyMap = function(key, element, array, keyMap) {
        this.deleteElementInArrayByKeyMap(key, array, keyMap);
        if (element) {
            array.push(element);
            keyMap[key] = array.indexOf(element);
        }
    };

    this.parseArgs = function(argLine) {
        if(!argLine || argLine === "") return [];
        var args = [];
        var parts = argLine.split(" ");
        var startsQuote = false;
        var endsQuote = false;
        var command = "";
        for(var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if(!startsQuote) {
                startsQuote = part.startsWith("\"");
            }

            if(startsQuote) {
                command = command + (part === "" ? " ": part);
                endsQuote = part.endsWith("\"");
            } else {
                command = part;
            }

            if(endsQuote) {
                startsQuote = false;
            }

            if(!startsQuote) {
                args.push(command);
                command = "";
            }
        }
        return args;
    }.bind(this);


    this.getTestPattern = function getTestPattern(args, defaultPattern) {
        var testFile = null;
        if(process.argv.length > 4) {
            testFile = args.slice(4)[0];
        }
        let filePattern = defaultPattern;
        if(testFile) {
            if(!testFile.startsWith("./__test__") && !testFile.startsWith("__test__") && !testFile.startsWith("/")) {
                filePattern = "__test__/**/*/"+testFile+".spec.js";
            } else {
                filePattern = testFile;
            }
        }
        return filePattern;
    }.bind(this);
};

module.exports = new Utility();
