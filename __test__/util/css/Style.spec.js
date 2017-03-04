import chai from "chai";
import Style from "util/css/Style";
const assert = chai.assert;

let mockDom = function (initialStyle) {
    let element = {
        style: initialStyle
    }
    return element;
};

describe("util/css/Style", () => {
    it("add", () => {
        let element = mockDom();
        let result = Style.add(element, { backgroundColor: "#333"});

        let expectedStyle = {
            backgroundColor: "#333"
        };
        assert.deepEqual(expectedStyle, result);
        assert.deepEqual(expectedStyle, element.style);

        result = Style.add(element, { color: "#333"});

        expectedStyle = {
            backgroundColor: "#333",
            color: "#333"
        };
        assert.deepEqual(expectedStyle, result);
        assert.deepEqual(expectedStyle, element.style);
    });
    it("remove", () => {

    });
});

