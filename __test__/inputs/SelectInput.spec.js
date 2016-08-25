import React from "react";
import chai from "chai";
import SelectInput from "inputs/SelectInput";
import Validations from "validation/InputValidations";
import TestUtils from "../TestUtils";

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
    it("props", () => {
        // standart default values
        let items = [
            {
                key: "MALE",
                value: "Male"
            },
            {
                key: "FEMALE",
                value: "Female"
            }
        ];

        let expectedProps = {
            label: "Select Input Single",
            items,
            placeHolder: "Please Select",
            noResultsText: "No Result",
            textField: "text",
            valueField: "value",
            multi: false,
            searchable: true,
            format: "DD/MM/YYYY",
            disabled: false,
            readOnly: false,
            hidden: false
        }

        let instance = TestUtils.renderIntoDocument(
            <SelectInput
                label="Select Input Single"
                items={items}
            />
        );
        chai.assert.deepEqual(instance.props, expectedProps, "Select Input default props must be equal the expected props.");

        // Multi , Different key , different value test
        expectedProps = {
            label: "Select Input Multi",
            multi: true,
            items: langs,
            value: "en,tr",
            textField: "value",
            valueField: "key",
            placeHolder: "Please Select",
            noResultsText: "No Result",
            searchable: true,
            format: "DD/MM/YYYY",
            disabled: false,
            readOnly: false,
            hidden: false
        };

        instance = TestUtils.renderIntoDocument(
            <SelectInput
                label="Select Input Multi"
                multi={true}
                items={langs}
                value={"en,tr"}
                textField="value"
                valueField="key"
            />
        );

        chai.assert.deepEqual(instance.props, expectedProps, "Given props to SelectInput must be equal the expected props.");
    });

    it("render", () => {
        let expected = "en,tr";
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
        chai.assert.equal(input.value, expected, "Given value to SelectInput must be equal input value which created in DOM.");
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

    it("'single' onChange", () => {
        let props = {
            label: "Select Input Single",
            items: langs,
            textField: "value",
            valueField: "key"
        };
        let wrapper = TestUtils.mount(props, SelectInput);
        let value = wrapper.find(SelectInput).node.getValue();
        chai.assert.isNull(value);
        chai.assert.equal(wrapper.find("[selected=true]").node, null);

        wrapper = TestUtils.mount({
            value: "en"
        }, SelectInput, props);

        chai.assert.equal("en", wrapper.find(SelectInput).node.getValue());
        chai.assert.equal(wrapper.find("[selected=true]").node.value, "en");
    });
    it("'multi' onChange", () => {
        let props = {
            label: "Select Input Single",
            items: langs,
            textField: "value",
            valueField: "key",
            multi: true
        };
        let wrapper = TestUtils.mount(props, SelectInput);

        chai.assert.deepEqual([], wrapper.find(SelectInput).node.getValue());
        chai.assert.equal(wrapper.find("[selected=true]").length, 0);

        wrapper = TestUtils.mount({
            value: ["en", "tr"]
        }, SelectInput, props);
        chai.assert.deepEqual(["en", "tr"], wrapper.find(SelectInput).node.getValue());
        chai.assert.equal(wrapper.find("[selected=true]").length, 2);
    });
});
