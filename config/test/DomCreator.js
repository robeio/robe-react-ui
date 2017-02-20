var path = require("path");
var fs = require("fs");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "UTF-8");

function createDOM() {
    var jsdom = require("jsdom").jsdom;
    // Define global.window and global.document.
    var document = jsdom();
    global.window = document.defaultView.window;
    // var domready = require("domready");
    global.document = global.window.document;
    global.document.getSelection = function (e) {
        return "";
    }

}

module.exports = createDOM();