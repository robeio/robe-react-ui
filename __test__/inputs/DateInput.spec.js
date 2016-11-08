import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import DateInputTest from "./DateInputTest";
import DateInput from "inputs/DateInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import moment from "moment";// eslint-disable-line import/no-extraneous-dependencies
import TestUtils from "../TestUtils";

describe("inputs/DateInput", () => {
    const assert = chai.assert;

    it("render", () => {
        let wrapper = TestUtils.mount({}, DateInput);

        let dateInput = wrapper.find(DateInput);
        assert.equal(dateInput.length, 1);

        let value = new Date().getTime();
        wrapper.setProps({ value: value });
        assert.equal(wrapper.props().value, value);

        wrapper.setProps({ label: "Example Label" });
        assert.equal(wrapper.props().label, "Example Label");
        assert.equal(wrapper.find(".control-label").length, 1);

        assert.equal(wrapper.props().locale, "en");
        wrapper.setProps({ locale: "tr" });
        assert.equal(wrapper.props().locale, "tr");
    });

    it("onChange", () => {
        let date = moment();
        let dateFormat = "DD-MM-YYYY";
        let wrapper = TestUtils.mount({ format: dateFormat }, DateInputTest);
        let dateInput = wrapper.find(DateInput);
        dateInput.node.__onChange(date);
        let dateInputValue = dateInput.find("input").node.value;
        assert.equal(dateInputValue, date.format(dateFormat));
        dateInput.node.__onChange();
    });
});
