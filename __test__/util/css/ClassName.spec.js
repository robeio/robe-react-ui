import chai from "chai";
import ClassName from "util/css/ClassName";
const assert = chai.assert;

let mockDom = function (initialClassName) {
    let className = initialClassName ? initialClassName: "";
    return {
        className
    }
};

describe("util/css/ClassName", () => {
    it("merge",() => {
        let classNames1 = ["classa", "classb"];
        let expectedClassName = "classa classb";
        assert.equal(expectedClassName, ClassName.merge(classNames1));
        assert.equal(expectedClassName, ClassName.merge("classa", "classb"));
    });
    it("set",() => {
        let element = mockDom();
        let expectedClassName = "classa classb";
        let result =  ClassName.set(element, "classa", "classb");
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);

        result =  ClassName.set(element, ["classa", "classb"]);
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);
    });
    it("add",() => {
        let element = mockDom();
        let expectedClassName = "classa classb";
        let result =  ClassName.add(element, "classa", "classb");
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);

        expectedClassName = "classa classb classc";
        result =  ClassName.add(element, ["classa", "classc"]);
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);
    });
    it("remove",() => {
        let element = mockDom("classa classb");
        let expectedClassName = "classa";
        let result = ClassName.remove(element, "classb");
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);

        element = mockDom("classa classb");
        expectedClassName = "classa";
        result = ClassName.remove(element, ["classb"]);
        assert.equal(expectedClassName, result);
        assert.equal(expectedClassName, element.className);
    });
});

