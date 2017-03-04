const appRoot = require("app-root-path");
const hasOwnProperty = Object.prototype.hasOwnProperty;

const Utility = function Utility() {
    this.projectDir = appRoot.path;
};

module.exports = new Utility();
