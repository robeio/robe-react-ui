class GlobalVariables {
    constructor() {
        // ****FOR PROD****
        window.applicationRootPath = "/hermes/site/";
        window.backendRootPath = "/hermes/";
        window.webSocketRootPath = "ws://demo.mebitech.com/hermes/";

        // ****FOR DEV****
        // window.applicationRootPath = "/";
        // window.backendRootPath = "http://127.0.0.1:8080/hermes/";
        // window.webSocketRootPath = "ws://127.0.0.1:8080/hermes/";
    }

    get(name) {
        let value = window[name];
        if (value === undefined) {
            console.warn("Global variable is not defined.", name);
        }
        return value;
    }
}

export default new GlobalVariables();
