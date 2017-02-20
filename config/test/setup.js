require("babel-polyfill");
require("./DomCreator");
jasmine.VERBOSE = true;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

var jestIt = window.it;
const functionPattern = /(function( [a-zA-Z_$][a-zA-Z_$0-9]*)?)[ ]*\((.*)\).*/;

window.it = (name: string, callback) => {
        if (!callback) {
            throw new Error("It function is not defined ! ");
        }
        var functionString = callback.toString();
        var results = functionString.match(functionPattern);

        if (!results || results.length !== 4) {
            throw new Error("Given parameter as function to 'it' is not a function ! ");
        }
        var doneString = results[4];

        if (!doneString || doneString.trim() === "") {
            jestIt(name, callback);
        } else {
            var error = null;

            jestIt(name, async () => {
                var prom = new Promise((resolve: Function, reject: Function) => {
                    try {
                        var err;
                        callback((result) => {
                            if (result) {
                                if(typeof result === "function") {
                                    try{
                                        result();
                                    }catch (ex) {
                                        err = ex;
                                    }
                                } else {
                                    err = result;
                                }
                            } else {
                                resolve();
                            }
                            err ? reject(err) : resolve();
                            err = null;
                        });
                    }catch (e) {
                        reject(e);
                    }
                });
                await prom.then(() => {
                    console.log(`${name} done.`);

                }).catch((e) => {
                    error = e;
                });
            });

            if(error) {
                throw error;
            }
        }
};