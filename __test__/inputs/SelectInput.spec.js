import React from "react";
import ReactDOM from "react-dom";
import chai from "chai";
import SelectInput from "inputs/SelectInput";
import TestUtils from "react-addons-test-utils";
import Validations from "validation/InputValidations";
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
            label: "Select Input Multi",
            items: items,
            placeHolder: "Please Select",
            noResultsText: "No Result",
            textField: "text",
            valueField: "value",
            multi: false,
            disabled: false,
            searchable: true
        };


        let instance = TestUtils.renderIntoDocument(
            <SelectInput
                label="Select Input Multi"
                items={items}
            />
        );
        chai.assert.deepEqual(instance.props, expectedProps);

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
            disabled: false,
            searchable: true
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

        chai.assert.deepEqual(instance.props, expectedProps);
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

        let instanceDom = ReactDOM.findDOMNode(instance);
        let inputs = instanceDom.getElementsByTagName("input");
        let input = inputs[0];
        chai.assert.equal(input.value, expected);
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

        chai.assert.isTrue(instance.isValid());


        console.log("Test....");
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

        chai.assert.isFalse(instance.isValid());
    });
});
