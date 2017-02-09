import React from "react";
import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import TestUtils from "../TestUtils";
import RadioInput from "inputs/RadioInput"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme"; // eslint-disable-line import/no-extraneous-dependencies

describe("inputs/RadioInput", () => {
    const langs = [
        {
            text: "English",
            value: "en"
        },
        {
            text: "Turkish",
            value: "tr"
        }, {
            text: "Kurdish",
            value: "ku"
        }
    ];


    const getComponent = (props: Object): Object => {
        return (
            <RadioInput {...props} /> // eslint-disable-line react/jsx-filename-extension
        );
    };


    let value = [];

    const handleChange = (e: Object) => {
        value = e.target.value;
    };

    it("props", () => {
        let props = {
            label: "Label",
            disabled: false,
            hidden: false
        };
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.props().label, "Label");
        chai.assert.equal(wrapper.props().disabled, false);
        chai.assert.equal(wrapper.props().hidden, false);

        wrapper.setProps({ label: "New Label", disabled: true, hidden: true });
        chai.assert.equal(wrapper.props().hidden, true);
        chai.assert.equal(wrapper.props().disabled, true);
        chai.assert.equal(wrapper.props().label, "New Label");
    });


    it("onChange", () => {
        let wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));
        let radioInput = wrapper.find(".fa-circle-o").first();

        radioInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));
        chai.assert.equal(wrapper.find(".fa-dot-circle-o").length, 1);
    });


    it("isChecked", () => {
        value = "";
        let wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));

        chai.assert.equal(wrapper.instance().isChecked(), false);
        let radioInput = wrapper.find(".fa-circle-o").first();

        radioInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));
        chai.assert.equal(wrapper.instance().isChecked(), true);

        radioInput = wrapper.find(".fa-circle-o").last();

        radioInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));
        chai.assert.equal(wrapper.instance().isChecked("en"), true);
    });


    it("getValue", () => {
        value = "";

        let wrapper = mount(getComponent({ items: langs, value: value, onChange: handleChange }));

        chai.assert.equal(wrapper.instance().getValue(), "");
        let radioInput = wrapper.find(".fa-circle-o").first();

        radioInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: value }));
        chai.assert.equal(wrapper.instance().getValue(), "en");


        radioInput = wrapper.find(".fa-dot-circle-o").first();
        radioInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: value }));
        chai.assert.equal(wrapper.instance().getValue(), "en");
    });
});
