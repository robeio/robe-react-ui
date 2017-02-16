import chai from "chai";
import TestUtils from "../TestUtils";
import Rating from "rating/Rating";

let size = 2;
let currentValue = 8;
let iconCount = 5;

describe("Rating", () => {

    it("render", () => {
        let wrapper = TestUtils.mount({}, Rating, {});
        chai.assert.equal(wrapper.find(Rating).length, 1);
        wrapper.unmount();

        let props = {
            size: size,
            iconCount: iconCount,
            currentValue: currentValue
        };

        wrapper = TestUtils.mount(props, Rating, props);
        let star = wrapper.find(".selectedStar");
        let tag = wrapper.find("i");

        chai.assert.equal(5, star.nodes.length, "Rendered Icons failed");

        for (let i = 0; i < props.iconCount - 1; i++) {
            chai.assert.equal("fa fa-star fa-3x", tag.nodes[i].className, "Rendered Icons failed");
        }

        wrapper.unmount();

        props = {};
        wrapper = TestUtils.mount(props, Rating, props);

        star = wrapper.find(".selectedStar");
        tag = wrapper.find("i");

        chai.assert.equal(10, star.nodes.length, "Rendered Icons failed");

        for (let i = 0; i < props.iconCount - 1; i++) {
            chai.assert.equal("fa fa-star-o fa-3x", tag.nodes[i].className, "Rendered Icons failed");
        }

        wrapper.unmount();


        props = {
            label: "Sample"
        };
        wrapper = TestUtils.mount(props, Rating, props);

        let label = wrapper.find("label");
        chai.assert.equal("Sample", label.node.innerText, "Label text fail");

        wrapper.unmount();

    });

    it("convertSizeToText", () => {
        let props = {
            size: 1
        };

        let wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(" fa-2x", wrapper.instance().__convertSizeToText(), "Convert Failed");
        wrapper.unmount();

        props = {
            size: 3
        };
        wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(" fa-4x", wrapper.instance().__convertSizeToText(), "Convert Failed");
        wrapper.unmount();
        props = {
            size: 4
        };
        wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(" fa-5x", wrapper.instance().__convertSizeToText(), "Convert Failed");
        wrapper.unmount();

        props = {};
        wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(" fa-lg", wrapper.instance().__convertSizeToText(), "Convert Failed");
        wrapper.unmount();
    });

    it("convertClickedIconToText", () => {
        let props = {
            size: 1
        };

        let wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal("fa-star-o fa-2x", wrapper.instance().__convertClickedIconToText(5), "Icon convert Failed");

        wrapper.unmount();
    });

    it("checkFloat", () => {
        let props = {
            currentValue: 4.5,
            disabled: true
        };

        let wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(true, wrapper.instance().__checkFloatInterval(), "Float convert Failed");
        wrapper.unmount();

        props = {
            currentValue: 4.5,
            disabled: false
        };

        wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(false, wrapper.instance().__checkFloatInterval(), "Float convert Failed");
        wrapper.unmount();

        props = {
            currentValue: 4.24,
            disabled: true
        };

        wrapper = TestUtils.mount(props, Rating, props);
        chai.assert.equal(false, wrapper.instance().__checkFloatInterval(), "Float convert Failed");
        wrapper.unmount();
    });
});
