import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import DateInput from "inputs/DateInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TestUtils from "../TestUtils";

describe("inputs/DateInput", () => {
    const assert = chai.assert;


    it("render", () => {
        let wrapper = TestUtils.mount({ label: "label" }, DateInput);


        let value = new Date().getTime();
        wrapper.setProps({ value: value });
        assert.equal(wrapper.props().value, value);

        wrapper.setProps({ label: "Example Label" });
        assert.equal(wrapper.props().label, "Example Label");
        assert.equal(wrapper.find(".control-label").length, 1);

        wrapper.setProps({ locale: "tr" });
        assert.equal(wrapper.props().locale, "tr");
    });

    it("onChange", () => {

    });
});
