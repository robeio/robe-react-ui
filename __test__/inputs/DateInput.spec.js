import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import DateInput from "inputs/DateInput"; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from "enzyme";// eslint-disable-line import/no-extraneous-dependencies
import DatePicker from "react-datepicker";// eslint-disable-line import/no-extraneous-dependencies
import moment from "moment";// eslint-disable-line import/no-extraneous-dependencies

describe("inputs/DateInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <DateInput // eslint-disable-line react/jsx-filename-extension
                {...props}
            />
        );
    };
    it("render", () => {
        let wrapper = mount(getComponent({ }));

        let dateInput = wrapper.find(DateInput);
        chai.assert.equal(dateInput.length, 1);

        let value = new Date().getTime();
        wrapper.setProps({ value: value });
        chai.assert.equal(wrapper.props().value, value);

        wrapper.setProps({ label: "Example Label" });
        chai.assert.equal(wrapper.props().label, "Example Label");
        chai.assert.equal(wrapper.find(".control-label").length, 1);
    });


    let value = "";

    const handleChange = (e) => {
        value = e.target.parsedValue;
    };

    it("onChange", () => {
        let wrapper = mount(getComponent({ onChange: handleChange }));
        let datePicker = wrapper.find(DatePicker);
        chai.assert.equal(datePicker.length, 1);

        let date = moment();
        let dateFormat = "YYYY-MM-DD";

        wrapper = mount(getComponent({ onChange: handleChange, value: value }));

        wrapper.find("input").simulate("change", {
            isDefaultPrevented: () => false,
            target: {
                value: date.format(dateFormat)
            }
        });
        chai.assert.equal("", value);
    });
});
