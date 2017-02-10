import React from "react";
import chai from "chai";
import TestUtils from "../TestUtils";
import SelectInput from "inputs/SelectInput";
import Validations from "validation/InputValidations";
import SelectInputTest from "./SelectInputTest";

const langs = [
    {
        key: "en",
        value: "English"
    },
    {
        key: "tr",
        value: "Turkish"
    },
    {
        key: "kurdi",
        value: "Kurdish"
    }
];
describe("inputs/SelectInput", () => {


    it("render", () => {
        let expected = ["en", "tr"];
        let SelectInputReact = (
            <SelectInput
                label="Select Input Multi"
                multi={true}
                items={langs}
                value={expected}
                textField="value"
                valueField="key"
            />
        );
        let instance = TestUtils.renderIntoDocument(
            SelectInputReact
        );

        let instanceDom = TestUtils.findDOMNode(instance);
        let inputs = instanceDom.getElementsByTagName("input");
        let input = inputs[0];
        // chai.assert.equal(input.value, expected, "Given value to SelectInput must be equal input value which created in DOM.");
    });
    it("isValid", () => {
        let SelectInputReact = (
            <SelectInput
                label="Select Input Multi"
                multi={true}
                items={langs}
                value={"en,tr"}
                textField="value"
                valueField="key"
            />
        );
        let instance = TestUtils.renderIntoDocument(
            SelectInputReact
        );

        chai.assert.isTrue(instance.isValid(), "component is not valid then isValid() method must return false.");

        SelectInputReact = (
            <SelectInput
                label="Select Input Multi"
                multi={true}
                items={langs}
                textField="value"
                valueField="key"
                validations={{
                    required: Validations.required
                }}
            />
        );
        instance = TestUtils.renderIntoDocument(
            SelectInputReact
        );

        chai.assert.isFalse(instance.isValid(), "component is valid then isValid() method must return true.");
    });

    it("isChecked", () => {
        let props = {
            label: "Select Input Single",
            items: langs,
            textField: "value",
            valueField: "key"
        };
        let wrapper = TestUtils.mount(props, SelectInput);
        let selectInput = wrapper.find(SelectInput).node;

        let isChecked = selectInput.isChecked();

        chai.assert.equal(isChecked, true);
        isChecked = selectInput.isChecked("tr");
        chai.assert.equal(isChecked, false);
    });

    it("'single' onChange", () => {
        let props = {
            label: "Select Input Single",
            items: langs,
            textField: "value",
            valueField: "key"
        };
        let wrapper = TestUtils.mount(props, SelectInputTest);
        let selectInput = wrapper.find(SelectInput).node;
        let value = selectInput.getValue();
        chai.assert.equal(wrapper.find("[selected=true]").selectInput, undefined);

    });

    it("'multi' onChange", () => {
        let props = {
            label: "Select Input Single",
            items: langs,
            textField: "value",
            valueField: "key",
            multi: true
        };
        let wrapper = TestUtils.mount(props, SelectInputTest);
        let selectInput = wrapper.find(SelectInput).node;
        chai.assert.deepEqual([], selectInput.getValue());
        chai.assert.equal(wrapper.find("[selected=true]").length, 0);


    });
});
